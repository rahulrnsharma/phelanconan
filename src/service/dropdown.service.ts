import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { TimezoneDto } from "src/dto/pagination.dto";
import { UtilityService } from "./utility.service";
import { SearchCourseDto, SearchDateDto, SearchFacultyDto, SearchTimeDto } from "src/dto/dropdown.dto";
import { StaffCeremonyDocument, StaffCeremonyModel } from "src/Schema/staff-ceremony.schema";

@Injectable()
export class DropdownService {
    constructor(@InjectModel(CeremonyModel.name) private ceremonyModel: Model<CeremonyDocument>,
        @InjectModel(StaffCeremonyModel.name) private staffCeremonyModel: Model<StaffCeremonyDocument>) { }

    async getInstitute(queryDto: TimezoneDto) {
        let _date = UtilityService.setStartHour(new Date(), queryDto.timezone);
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: { $gte: _date } })];
        query.push(UtilityService.getGroupPipeline({ _id: "$institute" }));
        query.push(UtilityService.getLookupPipeline("institutes", "_id", "_id", "institutes", [UtilityService.getMatchPipeline({ isActive: true })]));
        query.push(UtilityService.getUnwindPipeline("institutes"));
        query.push(UtilityService.getProjectPipeline({ name: "$institutes.name", id: "$institutes._id", "_id": 0 }))
        return this.ceremonyModel.aggregate(query);
    }


    async getDate(queryDto: SearchDateDto) {
        let _date = UtilityService.setStartHour(new Date(), queryDto.timezone);
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: { $gte: _date }, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getGroupPipeline({ _id: "$date" }));
        query.push(UtilityService.getProjectPipeline({ date: "$_id", _id: 0 }));
        return this.ceremonyModel.aggregate(query);
    }


    async getTime(queryDto: SearchTimeDto) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: queryDto.date, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getGroupPipeline({ _id: "$time" }));
        query.push(UtilityService.getProjectPipeline({ time: "$_id", _id: 0 }));
        return this.ceremonyModel.aggregate(query);
    }

    async getFaculty(queryDto: SearchFacultyDto) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: queryDto.date, time: queryDto.time, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getGroupPipeline({ _id: "$faculty" }));
        query.push(UtilityService.getLookupPipeline("faculties", "_id", "_id", "faculties", [UtilityService.getMatchPipeline({ isActive: true })]));
        query.push(UtilityService.getUnwindPipeline("faculties"));
        query.push(UtilityService.getProjectPipeline({ name: "$faculties.name", id: "$faculties._id", "_id": 0 }))
        return this.ceremonyModel.aggregate(query);
    }

    async getCourse(queryDto: SearchCourseDto) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: queryDto.date, time: queryDto.time, institute: new Types.ObjectId(queryDto.institute), faculty: new Types.ObjectId(queryDto.faculty) })];
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "courses", [UtilityService.getMatchPipeline({ isActive: true })]));
        query.push(UtilityService.getUnwindPipeline("courses"));
        query.push(UtilityService.getProjectPipeline({ name: "$courses.name", id: "$courses._id", price: 1, collectionLocation: 1, collectionTime: 1, cap: 1, returnLocation: 1, deadline: 1, "_id": 0 }))
        return this.ceremonyModel.aggregate(query);
    }

    async getStaffInstitute(queryDto: TimezoneDto) {
        let _date = UtilityService.setStartHour(new Date(), queryDto.timezone);
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: { $gte: _date } })];
        query.push(UtilityService.getGroupPipeline({ _id: "$institute" }));
        query.push(UtilityService.getLookupPipeline("institutes", "_id", "_id", "institutes", [UtilityService.getMatchPipeline({ isActive: true })]));
        query.push(UtilityService.getUnwindPipeline("institutes"));
        query.push(UtilityService.getProjectPipeline({ name: "$institutes.name", id: "$institutes._id", "_id": 0 }))
        return this.staffCeremonyModel.aggregate(query);
    }

    async getStaffDate(queryDto: SearchDateDto) {
        let _date = UtilityService.setStartHour(new Date(), queryDto.timezone);
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: { $gte: _date }, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getGroupPipeline({ _id: "$date" }));
        query.push(UtilityService.getProjectPipeline({ date: "$_id", _id: 0 }));
        return this.staffCeremonyModel.aggregate(query);
    }

    async getStaffTime(queryDto: SearchTimeDto) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: queryDto.date, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getGroupPipeline({ _id: "$time" }));
        query.push(UtilityService.getProjectPipeline({ time: "$_id", _id: 0 }));
        return this.staffCeremonyModel.aggregate(query);
    }

    async getStaffDuration(queryDto: SearchFacultyDto) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ isActive: true, date: queryDto.date, time: queryDto.time, institute: new Types.ObjectId(queryDto.institute) })];
        query.push(UtilityService.getProjectPipeline({ duration: "$duration", "_id": 0 }))
        return this.staffCeremonyModel.aggregate(query);
    }

} 