import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { Faculty, FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { FacultyDto } from "src/dto/faculty.dto";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";
import { ActiveDto, StatusDto } from "src/dto/pagination.dto";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";



@Injectable()
export class FacultyService {
    constructor(@InjectModel(FacultyModel.name) private readonly facultyModel: Model<FacultyDocument>,
        @InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>) { }

    async add(facultyDto: FacultyDto, user: IUser) {
        return new this.facultyModel({ ...facultyDto, createdBy: user.userId }).save()
    }

    async update(facultyDto: FacultyDto, id: string, user: IUser) {
        const _doc: Faculty = await this.facultyModel.findByIdAndUpdate(id, { $set: { ...facultyDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IUser) {
        const _inCeremony = await this.ceremonyModel.findOne({ faculty: new Types.ObjectId(id) }).exec();
        if (!_inCeremony) {
            const _doc: Faculty = await this.facultyModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
            if (_doc) {
                return _doc;
            }
            else {
                throw new BadRequestException("Resource you are delete does not exist.");
            }
        }
        else {
            throw new BadRequestException("Faculty is used in a ceremony please delete that then you can delete.");
        }
    }
    async status(id: string, activeDto: ActiveDto, user: IUser) {
        const _inCeremony = await this.ceremonyModel.findOne({ faculty: new Types.ObjectId(id) }).exec();
        if (!_inCeremony) {
            const _doc: Faculty = await this.facultyModel.findByIdAndUpdate(id, { $set: { isActive: activeDto.active, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
            if (_doc) {
                return _doc;
            }
            else {
                throw new BadRequestException("Resource you are update does not exist.");
            }
        }
        else {
            throw new BadRequestException("Faculty is used in a ceremony please delete that then you can deactive.");
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
        let _res: any[] = await this.facultyModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getById(id: string) {
        return this.facultyModel.findById(id);
    }
    async dropdown(statusDto: StatusDto) {
        let _match: any = {};
        if (statusDto.status) {
            _match["isActive"] = statusDto.status == ActiveStatusEnum.ACTIVE;
        }
        return this.facultyModel.find(_match).exec();
    }
}