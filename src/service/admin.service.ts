import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDocument, AdminModel } from "src/Schema/admin.schema";
import { AdminDto } from "src/dto/admin.dto";
import { PasswordService } from "./password.service";
import { IUser } from "src/interface/user.interface";
import { UserDocument, UserModel } from "src/Schema/user.schema";
import { RoleEnum, UserStatusEnum } from "src/enum/common.enum";


@Injectable()
export class AdminService {
    constructor(@InjectModel(AdminModel.name) private adminModel: Model<AdminDocument>,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>) {
    }
    async create(adminDto: AdminDto) {
        adminDto.password = await PasswordService.hash(adminDto.password);
        const _user = await new this.userModel({ username: adminDto.username, password: adminDto.password, role: RoleEnum.ADMIN, status: UserStatusEnum.APPROVED }).save();
        await new this.adminModel({ user: _user._id, firstName: adminDto.firstName, lastName: adminDto.lastName, email: adminDto.email }).save();
        return { success: true };
    }
    async profile(user: IUser) {
        return this.adminModel.findById(user.userId, { firstName: 1, lastName: 1, email: 1 });
    }
}