import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GownController } from "./gown.controller";
import { STAFF_GOWN_SCHEMA, STUDENT_GOWN_SCHEMA } from "src/Schema";
import { GownService } from "src/service/gown.service";
import { SendMailService } from "src/service/sendmail.service";


@Module({
    imports: [MongooseModule.forFeature([STUDENT_GOWN_SCHEMA, STAFF_GOWN_SCHEMA])],
    controllers: [GownController],
    providers: [GownService, SendMailService],
    exports: []
})

export class AppGownModule { }