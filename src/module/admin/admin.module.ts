import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "src/service/admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ADMIN_SCHEMA, USER_SCHEMA } from "src/Schema";


@Module({
    imports: [MongooseModule.forFeature([ADMIN_SCHEMA, USER_SCHEMA])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: []
})

export class AdminModule { }