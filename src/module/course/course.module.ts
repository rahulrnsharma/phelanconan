import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA, COURSE_SCHEMA } from "src/Schema";
import { CourseController } from "./course.controller";
import { CourseService } from "src/service/course.service";

@Module({
    imports: [MongooseModule.forFeature([COURSE_SCHEMA, CEREMONY_SCHEMA])],
    controllers: [CourseController],
    providers: [CourseService],
    exports: []
})

export class AppCourseModule { }