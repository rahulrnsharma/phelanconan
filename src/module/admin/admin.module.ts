import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "src/service/admin.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { ADMIN_SCHEMA } from "src/Schema/index.schema";


@Module({
    imports:[MongooseModule.forFeature([ADMIN_SCHEMA])],
    controllers:[AdminController],
    providers:[AdminService],
    exports:[]
})

export class AdminModule{}