import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Faculty, FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { FacultyDto } from "src/dto/faculty.dto";
import { IAdmin } from "src/interface/admin.interface";



@Injectable()
export class FacultyService {
    constructor(@InjectModel(FacultyModel.name) private readonly facultyModel: Model<FacultyDocument>) { }

    async add(facultyDto: FacultyDto, user: IAdmin) {
        return new this.facultyModel({ ...facultyDto, createdBy: user.userId }).save()
    }

    async update(facultyDto: FacultyDto, id: string, user: IAdmin) {
        const _doc: Faculty = await this.facultyModel.findByIdAndUpdate(id, { $set: { ...facultyDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IAdmin) {
        const _doc: Faculty = await this.facultyModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll() {
        return this.facultyModel.find().exec();
    }

    async getById(id: string) {
        return this.facultyModel.findById(id);
    }
    async dropdown() {
        return this.facultyModel.find({ isActive: true }).exec();
    }
}