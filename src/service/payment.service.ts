import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { createHash } from "crypto"
import { AppConfigService } from "./config.service";
import { CardDetailDto, PaymentAuthenticationDto, PaymentAuthorizationDto } from "src/dto/payment.dto";
import { catchError, map } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { TransactionDocument, TransactionModel } from "src/Schema/transaction.schema";
import { Model } from "mongoose";
import { UtilityService } from "./utility.service";

@Injectable()
export class PaymentService {
    private _globalPaymentApiUrl: string;
    private _globalPaymentRealexApiUrl: string;
    private _sharedSecret: string;
    private _merchantId: string;
    constructor(@InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionDocument>,
        private readonly httpService: HttpService, private appConfigService: AppConfigService) {
        this._globalPaymentApiUrl = this.appConfigService.globalPaymentApiUrl;
        this._globalPaymentRealexApiUrl = this.appConfigService.globalPaymentRealexApiUrl;
        this._sharedSecret = this.appConfigService.globalPaymentSharedSecret;
        this._merchantId = this.appConfigService.globalPaymentMerchantId;
    }
    private getTimeStamp(formate: boolean) {
        const _date = new Date();
        const _y = _date.getFullYear();
        const _m = String(_date.getMonth() + 1).padStart(2, '0');
        const _d = String(_date.getDate()).padStart(2, '0');
        const _hh = String(_date.getHours()).padStart(2, '0');
        const _mm = String(_date.getMinutes()).padStart(2, '0');
        const _ss = String(_date.getSeconds()).padStart(2, '0');
        const _sss = String(_date.getMilliseconds()).padStart(3, '0');
        if (formate)
            return `${_y}-${_m}-${_d}T${_hh}:${_mm}:${_ss}.${_sss}`;
        else
            return `${_y}${_m}${_d}${_hh}${_mm}${_ss}`;
    }
    private getSecureHash(data: any[]) {
        return createHash('sha1').update(`${createHash('sha1').update(data.join('.'), 'binary').digest('hex')}.${this._sharedSecret}`, 'binary').digest('hex');
    }
    private _protocolVersion(data: CardDetailDto) {
        const timestamp = this.getTimeStamp(true);
        const _hash: any[] = [timestamp, this._merchantId, data.number];
        return this.httpService.post(`${this._globalPaymentApiUrl}/3ds2/protocol-versions`, {
            "request_timestamp": timestamp,
            "merchant_id": this._merchantId,
            "account_id": "internet",
            "number": data.number,
            "scheme": data.scheme,
            "method_notification_url": "http://api.parshavanathmart.com/phelanconan/v1/payment/notification"
        }, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${this.getSecureHash(_hash)}`
            }
        });
    }
    private _initiatAuthenticate(data: PaymentAuthenticationDto) {
        const timestamp = this.getTimeStamp(true);
        const _hash: any[] = [timestamp, this._merchantId, data.card_detail.number, data.server_trans_id]
        data.order.date_time_created = timestamp;
        return this.httpService.post(`${this._globalPaymentApiUrl}/3ds2/authentications`, {
            "request_timestamp": timestamp,
            "authentication_source": "BROWSER",
            "authentication_request_type": "PAYMENT_TRANSACTION",
            "message_category": "PAYMENT_AUTHENTICATION",
            "message_version": "2.2.0",
            "merchant_id": this._merchantId,
            "account_id": "internet",
            "challenge_notification_url": "http://api.parshavanathmart.com/phelanconan/v1/payment/challenge",
            "method_url_completion": "YES",
            ...data
        }, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${this.getSecureHash(_hash)}`
            }
        });
    }
    private _getAuthentication(server_trans_id: string) {
        const timestamp = this.getTimeStamp(true);
        const _hash: any[] = [timestamp, this._merchantId, server_trans_id]
        return this.httpService.get(`${this._globalPaymentApiUrl}/3ds2/authentications/${server_trans_id}?merchant_id=${this._merchantId}&request_timestamp=${timestamp}`, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${this.getSecureHash(_hash)}`
            }
        });
    }
    private _authorization(data: PaymentAuthorizationDto) {
        let timestamp = this.getTimeStamp(false);
        let _hash: any[] = [timestamp, this._merchantId, data.orderid, data.amount * 100, data.currency, data.card_detail.number]
        return this.httpService.post(this._globalPaymentRealexApiUrl,
            `<?xml version="1.0" encoding="UTF-8"?>
            <request type="auth" timestamp="${timestamp}">
            <merchantid>${this._merchantId}</merchantid>
            <account>internet</account>
            <orderid>${data.orderid}</orderid>
            <channel>ECOM</channel>
            <amount currency="${data.currency}">${data.amount * 100}</amount>
            <card>
                <number>${data.card_detail.number}</number>
                <expdate>${data.card_detail.expiry_month}${data.card_detail.expiry_year}</expdate>
                <chname>${data.card_detail.full_name}</chname>
                <type>${data.card_detail.scheme}</type>
                <cvn>
                <number>${data.card_detail.cvn}</number>
                <presind>1</presind>
                </cvn>
            </card>
            <autosettle flag="1"/>
            <mpi>
                <eci>${data.eci}</eci>
                <ds_trans_id>${data.ds_trans_id}</ds_trans_id>
                <authentication_value>${data.authentication_value}</authentication_value>
                <message_version>${data.message_version}</message_version>
            </mpi>
            <sha1hash>${this.getSecureHash(_hash)}</sha1hash>
            </request>
            `, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });
    }
    async protocolVersion(cardDetail: CardDetailDto) {
        return this._protocolVersion(cardDetail).pipe(
            catchError((err: any) => { throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                const orderId = UtilityService.guid();
                await new this.transactionModel({ transactionId: res.data.server_trans_id, orderId: orderId, card: cardDetail, version: res.data }).save()
                return { ...res.data, orderId: orderId };
            })
        )
    }
    async initiatAuthenticate(data: PaymentAuthenticationDto) {
        return this._initiatAuthenticate(data).pipe(
            catchError((err: any) => { throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await this.transactionModel.findOneAndUpdate({ transactionId: data.server_trans_id }, { $set: { authenticate: res.data } }).exec();
                return res.data;
            })
        )
    }
    async getAuthentication(server_trans_id: string) {
        return this._getAuthentication(server_trans_id).pipe(
            catchError((err: any) => { throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await this.transactionModel.findOneAndUpdate({ transactionId: server_trans_id }, { $set: { authenticate: res.data } }).exec();
                return res.data;
            })
        )
    }
    async authorization(data: PaymentAuthorizationDto) {
        return this._authorization(data).pipe(
            catchError((err: any) => { throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await this.transactionModel.findOneAndUpdate({ transactionId: data.server_trans_id }, { $set: { authorization: res.data } }).exec();
                return res.data;
            })
        )
    }
}