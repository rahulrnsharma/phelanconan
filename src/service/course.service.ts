import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument, CourseModel } from "src/Schema/course.schema";
import { CourseDto } from "src/dto/course.dto";
import { IAdmin } from "src/interface/admin.interface";



@Injectable()
export class CourseService {
    constructor(@InjectModel(CourseModel.name) private courseModel: Model<CourseDocument>) { }

    async add(courseDto: CourseDto, user: IAdmin) {
        return new this.courseModel({ ...courseDto, createdBy: user.userId }).save()
    }

    async update(courseDto: CourseDto, id: string, user: IAdmin) {
        const _doc: Course = await this.courseModel.findByIdAndUpdate(id, { $set: { ...courseDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IAdmin) {
        const _doc: Course = await this.courseModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll() {
        return this.courseModel.find().exec();
    }

    async getById(id: string) {
        return this.courseModel.findById(id);
    }
}