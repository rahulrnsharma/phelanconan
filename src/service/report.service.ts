import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { StudentGownDocument, StudentGownModel } from "src/Schema/student-gown.schema";
import { PaginationResponse } from "src/model/pagination.model";
import { StaffGownDocument, StaffGownModel } from "src/Schema/staff-gown.schema";
import { StaffReportDto, StudentReportDto } from "src/dto/report.dto";
import { ActiveStatusEnum, RoleEnum } from "src/enum/common.enum";
import { UtilityService } from "./utility.service";
import { IUser } from "src/interface/user.interface";

@Injectable()
export class ReportService {
    constructor(@InjectModel(StudentGownModel.name) private readonly studentGownModel: Model<StudentGownDocument>,
        @InjectModel(StaffGownModel.name) private readonly staffGownModel: Model<StaffGownDocument>
    ) { }

    async getStudentReport(searchDto: StudentReportDto, user: IUser) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        if (searchDto.institute) {
            _match.institute = new Types.ObjectId(searchDto.institute);
        }
        if (searchDto.faculty) {
            _match.faculty = new Types.ObjectId(searchDto.faculty);
        }
        if (searchDto.course) {
            _match.course = new Types.ObjectId(searchDto.course);
        }
        if (searchDto.startDate && searchDto.endDate) {
            _match["$and"] = [
                { date: { $gte: UtilityService.setStartHour(searchDto.startDate, searchDto.timezone) } },
                { date: { $lt: UtilityService.setEndHour(searchDto.endDate, searchDto.timezone) } },
            ];
        }
        if (user.role = RoleEnum.STAFF) {
            _match.institute = new Types.ObjectId(user.institute);
        }
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

    async getStaffReport(searchDto: StaffReportDto, user: IUser) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        if (searchDto.institute) {
            _match.institute = new Types.ObjectId(searchDto.institute);
        }
        if (searchDto.startDate && searchDto.endDate) {
            _match["$and"] = [
                { date: { $gte: UtilityService.setStartHour(searchDto.startDate, searchDto.timezone) } },
                { date: { $lt: UtilityService.setEndHour(searchDto.endDate, searchDto.timezone) } },
            ];
        }
        if (user.role = RoleEnum.STAFF) {
            _match.institute = new Types.ObjectId(user.institute);
        }
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

    async downloadStudentReport(searchDto: StudentReportDto, user: IUser) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        if (searchDto.institute) {
            _match.institute = new Types.ObjectId(searchDto.institute);
        }
        if (searchDto.faculty) {
            _match.faculty = new Types.ObjectId(searchDto.faculty);
        }
        if (searchDto.course) {
            _match.course = new Types.ObjectId(searchDto.course);
        }
        if (searchDto.startDate && searchDto.endDate) {
            _match["$and"] = [
                { date: { $gte: UtilityService.setStartHour(searchDto.startDate, searchDto.timezone) } },
                { date: { $lt: UtilityService.setEndHour(searchDto.endDate, searchDto.timezone) } },
            ];
        }
        if (user.role = RoleEnum.STAFF) {
            _match.institute = new Types.ObjectId(user.institute);
        }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push(UtilityService.getSortPipeline('date', 'asc'));
        // query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        // query.push(UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]));
        // query.push(UtilityService.getUnwindPipeline("institute"));
        // query.push(UtilityService.getUnwindPipeline("faculty"));
        query.push(UtilityService.getUnwindPipeline("course"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));
        let _res: any[] = await this.studentGownModel.aggregate(query).exec();
        return UtilityService.getStudentReportExcel(_res);
    }

    async downloadStaffReport(searchDto: StaffReportDto, user: IUser) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        if (searchDto.institute) {
            _match.institute = new Types.ObjectId(searchDto.institute);
        }
        if (searchDto.startDate && searchDto.endDate) {
            _match["$and"] = [
                { date: { $gte: UtilityService.setStartHour(searchDto.startDate, searchDto.timezone) } },
                { date: { $lt: UtilityService.setEndHour(searchDto.endDate, searchDto.timezone) } },
            ];
        }
        if (user.role = RoleEnum.STAFF) {
            _match.institute = new Types.ObjectId(user.institute);
        }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push(UtilityService.getSortPipeline('date', 'asc'));
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));
        let _res: any[] = await this.staffGownModel.aggregate(query).exec();
        return UtilityService.getStaffReportExcel(_res);
    }
}