import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "src/service/admin.service";


@Module({
    imports:[],
    controllers:[AdminController],
    providers:[AdminService],
    exports:[]
})

export class AdminModule{}