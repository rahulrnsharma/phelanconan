import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "src/service/payment.service";
import { AppConfigService } from "src/service/config.service";
import { STUDENT_GOWN_SCHEMA, TRANSACTION_SCHEMA } from "src/Schema";
import { HttpModule } from "@nestjs/axios";


@Module({
    imports: [MongooseModule.forFeature([TRANSACTION_SCHEMA, STUDENT_GOWN_SCHEMA]), HttpModule],
    controllers: [PaymentController],
    providers: [PaymentService, AppConfigService],
    exports: []
})

export class AppPaymentModule {

}