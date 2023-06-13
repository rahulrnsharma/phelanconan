import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StudentGownDocument, StudentGownModel } from "src/Schema/student-gown.schema";
import { StudentGownDto } from "src/dto/student-gown.dto";



@Injectable()
export class GownService {
    constructor(@InjectModel(StudentGownModel.name) private readonly studentGownModel: Model<StudentGownDocument>) { }

    async addStudentGown(studentGownDto: StudentGownDto) {
        return new this.studentGownModel({ ...studentGownDto }).save()
    }
}