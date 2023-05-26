import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { FacultyDto } from "src/dto/faculty.dto";



@Injectable()
export class FacultyService{
    constructor(@InjectModel(FacultyModel.name) private readonly facultyModel:Model<FacultyDocument>){}
    
async add(FacultyDto:FacultyDto){
    const faculty = await this.facultyModel.findOne({...FacultyDto}).exec()
    if(faculty){
        return new BadRequestException('faculty already exist')
    }
    return await  new this.facultyModel({...FacultyDto}).save()
}

async update(FacultyDto:FacultyDto,id:string){
     const faculty = await this.facultyModel.findById(id);
     if(!faculty){
        return await new this.facultyModel({...FacultyDto}).save()
     }
     return await this.facultyModel.findByIdAndUpdate(id,FacultyDto).exec()
}

async delete(id:string){
    const faculty = await this.facultyModel.findById(id);
    if(!faculty){
        return new BadRequestException('faculty Does Not exist')
    }
    return await this.facultyModel.findByIdAndDelete(id)
}

async getAll(){
    return await this.facultyModel.find().exec();
}

async get(id:string){
    const faculty = await this.facultyModel.findById(id)
    if (!faculty) {
        return new BadRequestException('faculty Does Not exist');
    }
    return faculty;
}
}