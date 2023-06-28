import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { AdminDocument, AdminModel } from "src/Schema/admin.schema";
import { AdminDto } from "src/dto/admin.dto";
import { PasswordService } from "./password.service";
import { IUser } from "src/interface/user.interface";
import { UserDocument, UserModel } from "src/Schema/user.schema";
import { RoleEnum, UserStatusEnum } from "src/enum/common.enum";
import { UtilityService } from "./utility.service";


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
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(user.userId) })];
        if (user.role == RoleEnum.ADMIN) {
            query.push(UtilityService.getLookupPipeline("admins", "_id", "user", "profile", [UtilityService.getProjectPipeline({ firstName: 1, lastName: 1, email: 1 })]));
        }
        else {
            query.push(UtilityService.getLookupPipeline("staffs", "_id", "user", "profile", [UtilityService.getProjectPipeline({ firstName: 1, lastName: 1, email: 1, countryCode: 1, phone: 1, designation: 1 })]));
        }
        query.push(UtilityService.getUnwindPipeline("profile"));
        query.push(UtilityService.getProjectPipeline({ role: 1, profile: 1 }));
        let _res: any[] = await this.userModel.aggregate(query).exec();
        return _res[0];
    }
}