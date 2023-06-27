import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CourseDocument, CourseModel } from "src/Schema/course.schema";
import { FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { InstituteDocument, InstituteModel } from "src/Schema/institute.schema";

@Injectable()
export class OrderNumberService {
    constructor(@InjectModel(InstituteModel.name) private readonly instituteModel:Model<InstituteDocument>,
    @InjectModel(FacultyModel.name) private readonly facultyModel:Model<FacultyDocument>,
    @InjectModel(CourseModel.name) private readonly courseModel:Model<CourseDocument>){}
    
}