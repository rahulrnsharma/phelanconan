import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDocument, LoginModel } from "src/Schema/auth.schema";
import { LoginDto } from "src/dto/admin.dto";


@Injectable()
export class AuthService{
    constructor(@InjectModel(LoginModel.name) private loginModel:Model<LoginDocument>){}

    async login(loginDto:LoginDto){
       
    }
}