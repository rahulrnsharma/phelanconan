import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GownController } from "./gown.controller";
import { STUDENT_GOWN_SCHEMA } from "src/Schema";
import { GownService } from "src/service/gown.service";



@Module({
    imports: [MongooseModule.forFeature([STUDENT_GOWN_SCHEMA])],
    controllers: [GownController],
    providers: [GownService],
    exports: []
})

export class AppGownModule { }