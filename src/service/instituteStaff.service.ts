import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { InstituteStaffDocument, InstituteStaffModel } from "src/Schema/instituteStaff.schema";
import { InstituteStaffDto, UpdateInstituteStaffDto } from "src/dto/instituteStaff.dto";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";

@Injectable()
export class InstituteStaffService {
    constructor(@InjectModel(InstituteStaffModel.name) private readonly instituteStaffModel: Model<InstituteStaffDocument>,
    @InjectModel(CeremonyModel.name) private readonly ceremonyModel:Model<CeremonyDocument>) { }
    async register(instituteStaffDto: InstituteStaffDto) {
        return new this.instituteStaffModel({ ...instituteStaffDto }).save();
    }

    async update(id: string, updateInstituteStaffDto: UpdateInstituteStaffDto) {
        return await this.instituteStaffModel.findByIdAndUpdate(id, { updateInstituteStaffDto, updatedAt: new Date() }).exec();
    }
    async delete(id: string) {
        return await this.instituteStaffModel.findByIdAndDelete(id).exec();
    }

    async getFaculties(id:string){
            let query: PipelineStage[] = [UtilityService.getMatchPipeline({institute: new Types.ObjectId(id) })];
            query.push(UtilityService.getGroupPipeline({ _id: "$faculty" }));
            query.push(UtilityService.getLookupPipeline("faculties", "_id", "_id", "faculties", [UtilityService.getMatchPipeline({ isActive: true })]));
            query.push(UtilityService.getUnwindPipeline("faculties"));
            query.push(UtilityService.getProjectPipeline({ name: "$faculties.name", id: "$faculties._id", "_id": 0 }))
            return this.ceremonyModel.aggregate(query);
    }

    async getCourse(id:string) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ institute: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "courses", [UtilityService.getMatchPipeline({ isActive: true })]));
        query.push(UtilityService.getUnwindPipeline("courses"));
        query.push(UtilityService.getProjectPipeline({ name: "$courses.name", id: "$courses._id", price: 1, "_id": 0 }))
        return this.ceremonyModel.aggregate(query);
    }

    async getAll(searchDto: SearchDto) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
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
        let _res: any[] = await this.instituteStaffModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }


    async getById(id: string) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));
        let _res: any[] = await this.instituteStaffModel.aggregate(query).exec();
        return _res[0];
    }
}