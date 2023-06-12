import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { Institute, InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { InstituteDto } from "src/dto/institute.dto";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { IAdmin } from "src/interface/admin.interface";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";

@Injectable()
export class InstituteService {
    constructor(@InjectModel(InstituteModel.name) private instituteModel: Model<InstituteDocument>) { }

    async add(instituteDto: InstituteDto, user: IAdmin) {
        return new this.instituteModel({ ...instituteDto, createdBy: user.userId }).save()
    }

    async update(instituteDto: InstituteDto, id: string, user: IAdmin) {
        const _doc: Institute = await this.instituteModel.findByIdAndUpdate(id, { $set: { ...instituteDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IAdmin) {
        const _doc: Institute = await this.instituteModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll(searchDto: SearchDto) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        if (searchDto.search) {
            _match.name = {
                $regex: new RegExp(`${searchDto.search}`, "ig"),
            }
        }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push({
            $facet: {
                count: [{ $count: "total" }],
                data: [
                    UtilityService.getSortPipeline('createdAt', 'desc'),
                    UtilityService.getSkipPipeline(searchDto.currentPage, searchDto.pageSize),
                    UtilityService.getLimitPipeline(searchDto.pageSize),
                    UtilityService.getProjectPipeline({ name: 1, isActive: 1 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.instituteModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getById(id: string) {
        return this.instituteModel.findById(id);
    }
    async dropdown() {
        return this.instituteModel.find({ isActive: true }).exec();
    }
}