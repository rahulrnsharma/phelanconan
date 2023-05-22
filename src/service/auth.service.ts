import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDocument, LoginModel } from "src/Schema/auth.schema";
import { LoginDto } from "src/dto/auth.dto";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";
import { AppConfigService } from "./config.service";


@Injectable()
export class AuthService{
    constructor(@InjectModel(LoginModel.name) private loginModel:Model<LoginDocument>,
    private jwtService:JwtService,
    private appConfigService: AppConfigService){}

    async login(loginDto:LoginDto){
        const loginUser = await this.loginModel.findOne({username:loginDto.username})
        const PassMatch = await PasswordService.compare(loginDto.password,loginUser.password)
        if(!PassMatch){
            return new BadRequestException('Invalid Password')
        }
        return {
            token: this.jwtService.sign({ loggedInId: loginUser._id, userId: loginUser._id }, { expiresIn: this.appConfigService.userExpireIn })
        };
    }

    async logout(user){
       return await this.loginModel.findByIdAndUpdate(user.userId,{loggedOutAt:new Date(),isLoggedIn:false})
    }
}