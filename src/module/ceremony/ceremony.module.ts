import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA } from "src/Schema/index.schema";
import { CeremonyController } from "./ceremony.controller";
import { CeremonyService } from "src/service/ceremony.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerConfig } from "src/service/multer.config";


@Module({
    imports:[MongooseModule.forFeature([CEREMONY_SCHEMA]),MulterModule.register(multerConfig)],
    controllers:[CeremonyController],
    providers:[CeremonyService],
    exports:[]
})

export class AppCeremonyModule{}