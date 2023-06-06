import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA, COURSE_SCHEMA, FACULTY_SCHEMA, INSTITUTE_SCHEMA } from "src/Schema";
import { CeremonyController } from "./ceremony.controller";
import { CeremonyService } from "src/service/ceremony.service";


@Module({
    imports: [MongooseModule.forFeature([CEREMONY_SCHEMA, FACULTY_SCHEMA, COURSE_SCHEMA, INSTITUTE_SCHEMA])],
    controllers: [CeremonyController],
    providers: [CeremonyService],
    exports: []
})

export class AppCeremonyModule { }