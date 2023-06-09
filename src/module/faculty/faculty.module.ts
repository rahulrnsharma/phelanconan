import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA, FACULTY_SCHEMA } from "src/Schema";
import { FacultyController } from "./faculty.controller";
import { FacultyService } from "src/service/faculty.service";



@Module({
    imports: [MongooseModule.forFeature([FACULTY_SCHEMA, CEREMONY_SCHEMA])],
    controllers: [FacultyController],
    providers: [FacultyService],
    exports: []
})

export class AppFacultyModule { }