import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GownController } from "./gown.controller";
import { STUDENT_GOWN_SCHEMA, TRANSACTION_SCHEMA } from "src/Schema";
import { GownService } from "src/service/gown.service";
import { PaymentService } from "src/service/payment.service";
import { HttpModule } from "@nestjs/axios";



@Module({
    imports: [MongooseModule.forFeature([STUDENT_GOWN_SCHEMA, TRANSACTION_SCHEMA]), HttpModule],
    controllers: [GownController],
    providers: [GownService, PaymentService],
    exports: []
})

export class AppGownModule { }