import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { createHash } from "crypto"

@Injectable()
export class PaymentService {
    private _baseUrl: string;
    constructor(private readonly httpService: HttpService) {
        this._baseUrl = "https://api.sandbox.globalpay-ecommerce.com";
    }
    private getTimeStamp() {
        const _date = new Date();
        return `${_date.getFullYear()}-${String(_date.getMonth() + 1).padStart(2, '0')}-${String(_date.getDate()).padStart(2, '0')}T${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}:${String(_date.getSeconds()).padStart(2, '0')}.${String(_date.getMilliseconds()).padStart(3, '0')}`
    }
    private getSecureHash(data: any[]) {
        return createHash('sha1').update(data.join('.'), 'binary').digest('hex');
    }
    checkVersion() {
        let timestamp = this.getTimeStamp();
        let _data: any[] = [timestamp, 'dev564313104735132748', '4263970000005262']
        const securehash = this.getSecureHash([this.getSecureHash(_data), 'i21IqO6D7Y']);
        return this.httpService.post(`${this._baseUrl}/3ds2/protocol-versions`, {
            "request_timestamp": timestamp,
            "merchant_id": "dev564313104735132748",
            "account_id": "internet",
            "number": "4263970000005262",
            "scheme": "VISA",
            "method_notification_url": "http://localhost:3000/v1/gown/notification"
        }, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${securehash}`
            }
        });
    }
    initiatAuthenticate(tid: any, oid: any, browser_data: any) {
        let timestamp = this.getTimeStamp();
        let _data: any[] = [timestamp, 'dev564313104735132748', '4263970000005262', tid]
        const securehash = this.getSecureHash([this.getSecureHash(_data), 'i21IqO6D7Y']);
        return this.httpService.post(`${this._baseUrl}/3ds2/authentications`, {
            "request_timestamp": timestamp,
            "authentication_source": "BROWSER",
            "authentication_request_type": "PAYMENT_TRANSACTION",
            "message_category": "PAYMENT_AUTHENTICATION",
            "message_version": "2.2.0",
            // "challenge_request_indicator": "NO_PREFERENCE",
            "server_trans_id": tid,
            "merchant_id": "dev564313104735132748",
            "account_id": "internet",
            "card_detail": {
                "number": "4263970000005262",
                "scheme": "VISA",
                "expiry_month": "10",
                "expiry_year": "25",
                "full_name": "Sunil"
            },
            "order": {
                "date_time_created": `${timestamp}Z`,
                "amount": "10",
                "currency": "EUR",
                "id": oid,
                "address_match_indicator": "false",
                "shipping_address": {
                    "line1": "c-347",
                    "line2": "amarpali",
                    "line3": "vaishali nagar",
                    "city": "jaipur",
                    "postal_code": "302012",
                    "country": "356"
                }
            },
            "payer": {
                "email": "james.mason@example.com",
                "billing_address": {
                    "line1": "Flat 456",
                    "line2": "House 456",
                    "line3": "vaishali nagar",
                    "city": "jaipur",
                    "postal_code": "302012",
                    "country": "356"
                },
                "mobile_phone": {
                    "country_code": "91",
                    "subscriber_number": "8946801957"
                }
            },
            "challenge_notification_url": "http://api.parshavanathmart.com/phelanconan/v1/gown/challenge",
            "method_url_completion": "YES",
            "browser_data": {
                "accept_header": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "color_depth": browser_data.color_depth,
                "ip": browser_data.ip,
                "java_enabled": browser_data.java_enabled,
                "javascript_enabled": browser_data.javascript_enabled,
                "language": browser_data.language,
                "screen_height": browser_data.screen_height,
                "screen_width": browser_data.screen_width,
                "challenge_window_size": "FULL_SCREEN",
                "timezone": browser_data.timezone,
                "user_agent": browser_data.user_agent
            },
            "merchant_contact_url": "http://api.coregddemo.com/contact"
        }, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${securehash}`
            }
        });
    }
    getAuthenticationData(tid: any) {
        let timestamp = this.getTimeStamp();
        let _data: any[] = [timestamp, 'dev564313104735132748', tid]
        const securehash = this.getSecureHash([this.getSecureHash(_data), 'i21IqO6D7Y']);
        return this.httpService.get(`${this._baseUrl}/3ds2/authentications/${tid}?merchant_id=dev564313104735132748&request_timestamp=${timestamp}`, {
            headers: {
                "X-GP-VERSION": "2.2.0",
                Authorization: `securehash ${securehash}`
            }
        });
    }
}