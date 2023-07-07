import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { Course, CourseDocument, CourseModel } from "src/Schema/course.schema";
import { CourseDto } from "src/dto/course.dto";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";
import { ActiveDto } from "src/dto/pagination.dto";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";



@Injectable()
export class CourseService {
    constructor(@InjectModel(CourseModel.name) private courseModel: Model<CourseDocument>,
        @InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>) { }

    async add(courseDto: CourseDto, user: IUser) {
        return new this.courseModel({ ...courseDto, createdBy: user.userId }).save()
    }

    async update(courseDto: CourseDto, id: string, user: IUser) {
        const _doc: Course = await this.courseModel.findByIdAndUpdate(id, { $set: { ...courseDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IUser) {
        const _inCeremony = await this.ceremonyModel.findOne({ course: new Types.ObjectId(id) }).exec();
        if (!_inCeremony) {
            const _doc: Course = await this.courseModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
            if (_doc) {
                return _doc;
            }
            else {
                throw new BadRequestException("Resource you are delete does not exist.");
            }
        }
        else {
            throw new BadRequestException("Course is used in a ceremony please delete that then you can delete.");
        }
    }
    async status(id: string, activeDto: ActiveDto, user: IUser) {
        const _inCeremony = await this.ceremonyModel.findOne({ course: new Types.ObjectId(id) }).exec();
        if (!_inCeremony) {
            const _doc: Course = await this.courseModel.findByIdAndUpdate(id, { $set: { isActive: activeDto.active, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
            if (_doc) {
                return _doc;
            }
            else {
                throw new BadRequestException("Resource you are update does not exist.");
            }
        }
        else {
            throw new BadRequestException("Course is used in a ceremony please delete that then you can deactivate.");
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
                    UtilityService.getProjectPipeline({ name: 1, isActive: 1, hood: 1 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.courseModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getById(id: string) {
        return this.courseModel.findById(id);
    }
    async dropdown() {
        return this.courseModel.find().exec();
    }
}