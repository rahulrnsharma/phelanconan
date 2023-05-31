import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Institute, InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { InstituteDto } from "src/dto/institute.dto";
import { IAdmin } from "src/interface/admin.interface";

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

    async getAll() {
        return this.instituteModel.find().exec();
    }

    async getById(id: string) {
        return this.instituteModel.findById(id);
    }
}