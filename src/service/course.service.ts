import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CourseDocument, CourseModel } from "src/Schema/course.schema";
import { CourseDto } from "src/dto/course.dto";
import { IAdmin } from "src/interface/admin.interface";



export class CourseService{
constructor(@InjectModel(CourseModel.name) private courseModel:Model<CourseDocument>){}

async add(CourseDto:CourseDto){
    const course = await this.courseModel.findOne({name:CourseDto.course,code:CourseDto.code}).exec()
    if(course){
        return new BadRequestException('course already exist')
    }
    return await new this.courseModel({...CourseDto}).save()
}

async update(CourseDto:CourseDto,id:string){
     const course = await this.courseModel.findById(id);
     if(!course){
        return await new this.courseModel({...CourseDto}).save()
     }
     return await this.courseModel.findByIdAndUpdate(id,CourseDto).exec()
}

async delete(id:string){
    const course = await this.courseModel.findById(id);
    if(!course){
        return new BadRequestException('course Does Not exist')
    }
    return await this.courseModel.findByIdAndDelete(id)
}

async getAll(){
    return await this.courseModel.find().exec();
}

async get(id:string){
    const course = await this.courseModel.findById(id)
    if (!course) {
        return new BadRequestException('course Does Not exist');
    }
    return course;
}
}