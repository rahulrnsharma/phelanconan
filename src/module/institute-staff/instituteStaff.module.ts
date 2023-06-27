import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ADMIN_SCHEMA, CEREMONY_SCHEMA, COURSE_SCHEMA, FACULTY_SCHEMA, INSTITUTE_SCHEMA, INSTITUTE_STAFF_SCHEMA } from "src/Schema";
import { InstituteStaffController } from "./instituteStaff.controller";
import { InstituteStaffService } from "src/service/instituteStaff.service";
import { CeremonyService } from "src/service/ceremony.service";

@Module({
    imports:[MongooseModule.forFeature([INSTITUTE_STAFF_SCHEMA,ADMIN_SCHEMA,CEREMONY_SCHEMA, FACULTY_SCHEMA, COURSE_SCHEMA, INSTITUTE_SCHEMA])],
    controllers:[InstituteStaffController],
    providers:[InstituteStaffService,CeremonyService],
    exports:[]
})

export class AppInstituteStaff{}