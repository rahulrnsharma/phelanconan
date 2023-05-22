import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDocument, AdminModel } from "src/Schema/admin.schema";
import { AdminDto } from "src/dto/admin.dto";
import { PasswordService } from "./password.service";


@Injectable()
export class AdminService {
    constructor(@InjectModel(AdminModel.name) private adminModel: Model<AdminDocument>) {
    }
    async create(adminDto: AdminDto) {
        adminDto.password = PasswordService.hash(adminDto.password)
       return new this.adminModel({...adminDto}).save()
    }
}