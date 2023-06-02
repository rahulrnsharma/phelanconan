import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { Ceremony, CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IAdmin } from "src/interface/admin.interface";
import { UtilityService } from "./utility.service";

@Injectable()
export class CeremonyService {
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>) { }
    async add(ceremonyDto: CeremonyDto, user: IAdmin) {
        return new this.ceremonyModel({ ...ceremonyDto, createdBy: user.userId }).save();
    }

    async update(ceremonyDto: CeremonyDto, id: string, user: IAdmin) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { ...ceremonyDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IAdmin) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll() {
        let query: PipelineStage[] = [
            { $match: { isActive: true } },
            {
                $lookup: {
                    from: "institutes",
                    localField: "institute",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "institute"
                }
            },
            {
                $lookup: {
                    from: "faculties",
                    localField: "faculty",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "faculty"
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "course"
                }
            },
            {
                $unwind: {
                    path: "$institute",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$faculty",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$course",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]
        return this.ceremonyModel.aggregate(query).exec();
    }

    async getById(id: any) {
        return this.ceremonyModel.findById(id);
    }
    async uploadVerify(file: any) {
        return UtilityService.readExcelFileData(file);
    }
}

