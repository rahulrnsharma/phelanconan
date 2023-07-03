import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { STAFF_GOWN_SCHEMA, STUDENT_GOWN_SCHEMA } from "src/Schema";
import { ReportService } from "src/service/report.service";
import { ReportController } from "./report.controller";


@Module({
    imports: [MongooseModule.forFeature([STUDENT_GOWN_SCHEMA, STAFF_GOWN_SCHEMA])],
    controllers: [ReportController],
    providers: [ReportService],
    exports: []
})

export class AppReportModule { }