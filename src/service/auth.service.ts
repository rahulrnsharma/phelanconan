import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LoginDocument, LoginModel } from "src/Schema/login.schema";
import { LoginDto } from "src/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { AppConfigService } from "./config.service";
import { IUser } from "src/interface/user.interface";
import { UserDocument, UserModel } from "src/Schema/user.schema";
import { PasswordService } from "./password.service";
import { UserStatusEnum } from "src/enum/common.enum";
@Injectable()
export class AuthService {
    constructor(@InjectModel(LoginModel.name) private loginModel: Model<LoginDocument>,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService, private appConfigService: AppConfigService) { }

    async login(user: IUser) {
        const login = await this.loginDetail(user);
        user.loggedInId = login._id;
        return { token: this.jwtService.sign(user, { expiresIn: this.appConfigService.adminExpireIn }) };
    }

    async logout(user: IUser) {
        return await this.loginModel.findByIdAndUpdate(user.loggedInId, { isLoggedIn: false })
    }

    async getLoggedInDetail(id: any) {
        return this.loginModel.findOne({ user: new Types.ObjectId(id), isLoggedIn: true }, {}, { sort: { createdAt: -1 } }).exec();
    }

    async loginDetail(user: any) {
        return new this.loginModel({ user: new Types.ObjectId(user.userId), role: user.role, isLoggedIn: true }).save();
    }

    async validateAdminUser(loginDto: LoginDto): Promise<any> {
        const user: any = await this.findByUserNameAndPassword(loginDto);
        if (user) {
            const result: IUser = {
                userId: user._id,
                role: user.role
            };
            return result;
        }
        return null;
    }
    private async findByUserNameAndPassword(loginDto: LoginDto) {
        const user = await this.userModel.findOne({ username: loginDto.username });
        if (user) {
            const isMatch = await PasswordService.compare(loginDto.password, user.password);
            if (!isMatch) {
                throw new BadRequestException("Invalid Credentials.");
            }
            else if (!user.isActive) {
                throw new BadRequestException("Your account has not deactivate. Please contact to admin or support.");
            }
            else if (user.status != UserStatusEnum.APPROVED) {
                throw new BadRequestException("Your account has not approved. Please contact to admin or support.");
            }
            return user;
        }
        throw new BadRequestException("Invalid Credentials.");
    }
}