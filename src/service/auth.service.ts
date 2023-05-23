import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LoginDocument, LoginModel } from "src/Schema/auth.schema";
import { LoginDto } from "src/dto/auth.dto";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";
import { AppConfigService } from "./config.service";
import { AdminDocument, AdminModel } from "src/Schema/admin.schema";
import { AdminService } from "./admin.service";
import { IAdmin } from "src/interface/admin.interface";


@Injectable()
export class AuthService{
    constructor(@InjectModel(LoginModel.name) private loginModel:Model<LoginDocument>,
    @InjectModel(AdminModel.name) private adminModel:Model<AdminDocument>,
   private adminService:AdminService,
    private jwtService:JwtService,
    private appConfigService: AppConfigService){}

    async login(loginDto:LoginDto){
        const loginUser = await this.adminModel.findOne({username:loginDto.username}).exec()
        const PassMatch = await PasswordService.compare(loginDto.password,loginUser.password)
        if(!PassMatch){
            return new BadRequestException('Invalid Password')
        }
        const login = await this.loginDetail(loginUser._id);
        console.log(login); 
        return {
            token: this.jwtService.sign({ loggedInId: login._id, userId: login._id }, { expiresIn: this.appConfigService.userExpireIn })
        };
    }

    async logout(user){
       return await this.loginModel.findByIdAndUpdate(user.userId,{loggedOutAt:new Date(),isLoggedIn:false})
    }
    async getLoggedInDetail(id: any) {
        const loginedUser =await this.loginModel.findOne({ username: new Types.ObjectId(id), isLoggedIn: true }).exec();
        console.log(loginedUser+"Provieded");
        return loginedUser;
    }

    async loginDetail(userId: any) {
        return new this.loginModel({ username: userId, isLoggedIn: true, loggedInAt: new Date() }).save();
    }

    async validateAdminUser(loginDto: LoginDto): Promise<any> {
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