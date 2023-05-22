import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LoginDocument = HydratedDocument<Login>

@Schema({timestamps:true})
export class Login{
@Prop({type:String,required:true})
username: string;
@Prop({type:String,required:true})
password:string
}

export const LoginSchema = SchemaFactory.createForClass(Login);
export const LoginModel = {name:'admin',schema:LoginSchema}