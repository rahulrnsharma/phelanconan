import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { StudentGownDocument, StudentGownModel } from "src/Schema/student-gown.schema";
import { SearchGownDto, StudentGownDto } from "src/dto/student-gown.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";
import { SendMailService } from "./sendmail.service";
import { StaffGownDto } from "src/dto/staff-gown.dto";
import { StaffGownDocument, StaffGownModel } from "src/Schema/staff-gown.schema";

@Injectable()
export class GownService {
    constructor(@InjectModel(StudentGownModel.name) private readonly studentGownModel: Model<StudentGownDocument>,
        @InjectModel(StaffGownModel.name) private readonly staffGownModel: Model<StaffGownDocument>,
        private sendmailService: SendMailService,
    ) { }

    async addStudentGown(studentGownDto: StudentGownDto) {
        const _count = await this.studentGownModel.count({ institute: new Types.ObjectId(studentGownDto.institute) });
        const _refNo = await this.studentGownModel.count();
        let _orderNumber = UtilityService.getOrderNumber(studentGownDto.refno, _count);
        studentGownDto.guest.forEach((obj: any, index: number) => {
            obj.ticket = `G${index + 1}-${_orderNumber}`
        })
        const studentGown = await new this.studentGownModel({ ...studentGownDto, orderNumber: _orderNumber }).save()
        let query: PipelineStage[] = [
            UtilityService.getMatchPipeline({ _id: studentGown._id }),
            UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1 })]),
            UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
            UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
            UtilityService.getUnwindPipeline("institute"),
            UtilityService.getUnwindPipeline("faculty"),
            UtilityService.getUnwindPipeline("course"),
            UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
        ]
        let _data: any[] = await this.studentGownModel.aggregate(query).exec();
        this.sendmailService.studentGownBooking(_data[0]);
        return studentGown;
    }

    async addStaffGown(staffGownDto: StaffGownDto) {
        const _count = await this.staffGownModel.count({ institute: new Types.ObjectId(staffGownDto.institute) });
        let _orderNumber = UtilityService.getOrderNumber(staffGownDto.refno, _count);
        const staffGown = await new this.staffGownModel({ ...staffGownDto, orderNumber: _orderNumber }).save()
        if (staffGown) {
            let data: PipelineStage[];
            data = [
                UtilityService.getMatchPipeline({ _id: staffGown._id }),
                UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]),
                UtilityService.getUnwindPipeline("institute"),
                UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
            ]
            let _data: any[] = await this.staffGownModel.aggregate(data).exec();
            this.sendmailService.staffGownBooking(_data[0])
            return { sucess: true };
        }
    }
    async getAllStudentGown(searchDto: SearchGownDto) {

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

    async getAllStaffGown(searchDto: SearchGownDto) {
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
                    UtilityService.getUnwindPipeline("institute"),
                    UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.staffGownModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getStaffGownById(id: any) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));

        let _res: any[] = await this.staffGownModel.aggregate(query).exec();
        return _res[0];
    }

    async getStudentGownById(id: any) {

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
}