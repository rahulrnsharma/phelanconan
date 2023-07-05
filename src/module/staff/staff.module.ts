import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { USER_SCHEMA, STAFF_SCHEMA } from "src/Schema";
import { StaffController } from "./staff.controller";
import { StaffService } from "src/service/staff.service";
import { SendMailService } from "src/service/sendmail.service";

@Module({
    imports: [MongooseModule.forFeature([STAFF_SCHEMA, USER_SCHEMA])],
    controllers: [StaffController],
    providers: [StaffService,SendMailService],
    exports: []
})

export class AppStaffModule { }