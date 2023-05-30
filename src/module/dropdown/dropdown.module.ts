import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CEREMONY_SCHEMA } from "src/Schema/index.schema";
import { DropdownController } from "./dropdown.controller";
import { DropdownService } from "src/service/dropdown.service";


@Module({
    imports:[MongooseModule.forFeature([CEREMONY_SCHEMA])],
    controllers:[DropdownController],
    providers:[DropdownService],
    exports:[]
})

export class AppDropdownModule{
    
}