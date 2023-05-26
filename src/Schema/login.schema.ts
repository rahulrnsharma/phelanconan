import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId, Types } from "mongoose";

export type LoginDocument = HydratedDocument<Login>

@Schema({timestamps:true})
export class Login{
@Prop({type:mongoose.Schema.Types.ObjectId})
user: ObjectId;
@Prop({ type: Boolean, default: true })
isLoggedIn: boolean;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
export const LoginModel = {name:'login',schema:LoginSchema}