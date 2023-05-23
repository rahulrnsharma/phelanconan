import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDocument, AdminModel } from "src/Schema/admin.schema";
import { AdminDto } from "src/dto/admin.dto";
import { PasswordService } from "./password.service";
import { LoginDto } from "src/dto/auth.dto";


@Injectable()
export class AdminService {
    constructor(@InjectModel(AdminModel.name) private adminModel: Model<AdminDocument>) {
    }
    async create(adminDto: AdminDto) {
        adminDto.password =await PasswordService.hash(adminDto.password)
       return new this.adminModel({...adminDto}).save()
    }
    async findByUserNameAndPassword(loginDto: LoginDto) {
        const admin = await this.adminModel.findOne({ username: loginDto.username });
        if (admin) {
            const isMatch = await PasswordService.compare(loginDto.password, admin.password);
            if (!isMatch) {
                throw new BadRequestException("Invalid Credentials.");
            }
            return admin;
        }
        throw new BadRequestException("Invalid Credentials.");
    }
}