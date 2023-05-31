import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LoginDocument, LoginModel } from "src/Schema/login.schema";
import { AdminLoginDto } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { AppConfigService } from "./config.service";
import { AdminService } from "./admin.service";
import { IAdmin } from "src/interface/admin.interface";


@Injectable()
export class AuthService {
    constructor(@InjectModel(LoginModel.name) private loginModel: Model<LoginDocument>,
        private adminService: AdminService,
        private jwtService: JwtService,
        private appConfigService: AppConfigService) { }

    async login(user: IAdmin) {
        const login = await this.loginDetail(user.userId);
        user.loggedInId = login._id;
        return { token: this.jwtService.sign(user, { expiresIn: this.appConfigService.adminExpireIn }) };
    }

    async logout(user: IAdmin) {
        return await this.loginModel.findByIdAndUpdate(user.loggedInId, { isLoggedIn: false })
    }

    async getLoggedInDetail(id: any) {
        return this.loginModel.findOne({ user: new Types.ObjectId(id), isLoggedIn: true }, {}, { sort: { createdAt: -1 } }).exec();
    }

    async loginDetail(userId: any) {
        return new this.loginModel({ user: new Types.ObjectId(userId), isLoggedIn: true }).save();
    }

    async validateAdminUser(loginDto: AdminLoginDto): Promise<any> {
        const user: any = await this.adminService.findByUserNameAndPassword(loginDto);
        if (user) {
            const result: IAdmin = {
                userId: user._id,
                role: user.role
            };
            return result;
        }
        return null;
    }
}