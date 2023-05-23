import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LoginDocument = HydratedDocument<Login>

@Schema({timestamps:true})
export class Login{
@Prop({type:String,required:true})
username: string;
@Prop({type:String})
password:string

@Prop({ type: Boolean, default: true })
isLoggedIn: boolean;
@Prop({ type: Date, required: true })
loggedInAt: Date;
@Prop({ type: Date })
loggedOutAt: Date;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
export const LoginModel = {name:'login',schema:LoginSchema}