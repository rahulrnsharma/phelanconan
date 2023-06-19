import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { StudentGownDocument, StudentGownModel } from "src/Schema/student-gown.schema";
import { SearchGownDto, StudentGownDto } from "src/dto/student-gown.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";
import { PaymentService } from "./payment.service";
import { catchError, map } from "rxjs";
import { TransactionDocument, TransactionModel } from "src/Schema/transaction.schema";



@Injectable()
export class GownService {
    constructor(@InjectModel(StudentGownModel.name) private readonly studentGownModel: Model<StudentGownDocument>,
        @InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionDocument>,
        private readonly paymentService: PaymentService) { }

    async addStudentGown(studentGownDto: StudentGownDto) {
        return new this.studentGownModel({ ...studentGownDto }).save()
    }

    async getAll(searchDto: SearchGownDto) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        // if (searchDto.search) {
        //     _match.name = {
        //         $regex: new RegExp(`${searchDto.search}`, "ig"),
        //     }
        // }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push({
            $facet: {
                count: [{ $count: "total" }],
                data: [
                    UtilityService.getSortPipeline('createdAt', 'desc'),
                    UtilityService.getSkipPipeline(searchDto.currentPage, searchDto.pageSize),
                    UtilityService.getLimitPipeline(searchDto.pageSize),
                    UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getUnwindPipeline("institute"),
                    UtilityService.getUnwindPipeline("faculty"),
                    UtilityService.getUnwindPipeline("course"),
                    UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.studentGownModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }
    async getById(id: any) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getUnwindPipeline("faculty"));
        query.push(UtilityService.getUnwindPipeline("course"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));

        let _res: any[] = await this.studentGownModel.aggregate(query).exec();
        return _res[0];
    }
    async testpay() {
        return this.paymentService.checkVersion().pipe(
            catchError((err: any) => { console.log(err.response); throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await new this.transactionModel({ transactionId: res.data.server_trans_id, data: [res.data] }).save()
                return res.data;
            })
        )
    }
    async initiate(tid: any, browserdata: any) {
        let orderid = `${this.generateString(8)}-${this.generateString(4)}-${this.generateString(4)}-${this.generateString(4)}-${this.generateString(12)}`;
        return this.paymentService.initiatAuthenticate(tid, orderid, browserdata).pipe(
            catchError((err: any) => { console.log(err.response); throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await this.transactionModel.findOneAndUpdate({ transactionId: tid }, {
                    $set: {
                        orderId: orderid, $push: {
                            data: res.data
                        },
                    }
                }).exec()
                return res.data;
            })
        )
    }
    async getAuthentication(tid: any) {
        return this.paymentService.getAuthenticationData(tid).pipe(
            catchError((err: any) => { console.log(err.response); throw new BadRequestException(err.response.data.error_description) }),
            map(async (res: any) => {
                await this.transactionModel.findOneAndUpdate({ transactionId: tid }, {
                    $set: {
                        $push: {
                            data: res.data
                        },
                    }
                }).exec()
                return res.data;
            })
        )
    }
    private generateString(length: any) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    notification(data: any) {
        return data;
    }
    challenge(data: any) {
        return data;
    }
}