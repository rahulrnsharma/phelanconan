import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { COURSE_SCHEMA } from "src/Schema/index.schema";
import { CourseController } from "./course.controller";
import { CourseService } from "src/service/course.service";

@Module({
    imports:[MongooseModule.forFeature([COURSE_SCHEMA])],
    controllers:[CourseController],
    providers:[CourseService],
    exports:[]
})

export class AppCourseModule{}