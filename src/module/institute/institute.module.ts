import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { INSTITUTE_SCHEMA } from "src/Schema";
import { InstituteController } from "./institute.controller";
import { InstituteService } from "src/service/institute.service";


@Module({
    imports: [MongooseModule.forFeature([INSTITUTE_SCHEMA])],
    controllers: [InstituteController],
    providers: [InstituteService],
    exports: []
})

export class AppInstituteModule { }