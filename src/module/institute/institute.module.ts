import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA, INSTITUTE_SCHEMA, STAFF_CEREMONY_SCHEMA } from "src/Schema";
import { InstituteController } from "./institute.controller";
import { InstituteService } from "src/service/institute.service";


@Module({
    imports: [MongooseModule.forFeature([INSTITUTE_SCHEMA, CEREMONY_SCHEMA, STAFF_CEREMONY_SCHEMA])],
    controllers: [InstituteController],
    providers: [InstituteService],
    exports: []
})

export class AppInstituteModule { } 