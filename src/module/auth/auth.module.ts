import { Module } from "@nestjs/common";
import { AuthService } from "src/service/auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { LOGIN_SCHEMA } from "src/Schema/index.schema";

@Module({
imports:[MongooseModule.forFeature([LOGIN_SCHEMA])],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[]
})

export class AppAuthModule{}