import { BadGatewayException, Injectable } from "@nestjs/common";
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
        let _orderNumber = UtilityService.getOrderNumber();
        const studentGown = await new this.studentGownModel({ ...studentGownDto, orderNumber: _orderNumber }).save()
        let data: PipelineStage[];
        data = [
            UtilityService.getMatchPipeline({_id:studentGown._id}),
            UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]),
            UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
            UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
            UtilityService.getUnwindPipeline("institute"),
            UtilityService.getUnwindPipeline("faculty"),
            UtilityService.getUnwindPipeline("course"),
            UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
        ]
        let _data: any[] = await this.studentGownModel.aggregate(data).exec()
        // const mail = await this.sendmailService.sendMail(_data);
        return studentGown;
    }

    async addStaffGown(staffGownDto: StaffGownDto) {
        const mail = await this.sendmailService.sendMail(staffGownDto);
        let _orderNumber = UtilityService.getOrderNumber();
        return new this.staffGownModel({ ...staffGownDto, orderNumber: _orderNumber }).save();
        //    const staffGown = await new this.staffGownModel({ ...staffGownDto }).save()
        //    if(staffGown){
        //     let data: PipelineStage[];
        //     data = [
        //    UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]),
        //        UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
        //        UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
        //        UtilityService.getUnwindPipeline("institute"),
        //        UtilityService.getUnwindPipeline("faculty"),
        //        UtilityService.getUnwindPipeline("course"),
        //        UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
        //    ]
        //    let _data: any[] = await this.staffGownModel.aggregate(data).exec()
        //        const mail = await this.sendmailService.sendMail(_data);
        //    }
        //     return ;
    }
    async getAllStudent(searchDto: SearchGownDto) {
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

    async getAllStaff(searchDto: SearchGownDto) {
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
        let _res: any[] = await this.staffGownModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getByIdStaff(id: any) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getUnwindPipeline("faculty"));
        query.push(UtilityService.getUnwindPipeline("course"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));

        let _res: any[] = await this.staffGownModel.aggregate(query).exec();
        return _res[0];
    }

    async getByIdStudent(id: any) {

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