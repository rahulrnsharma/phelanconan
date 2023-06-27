import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoleEnum, UserStatusEnum } from "src/enum/common.enum";
import { Base } from "./base.schema";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User extends Base {
    @Prop({ type: String, required: true, index: true, unique: true })
    username: string;
    @Prop({ type: String, required: true, trim: true })
    password: string;
    @Prop({ type: String, enum: RoleEnum, trim: true, default: RoleEnum.STAFF })
    role: string;
    @Prop({ type: String, enum: UserStatusEnum, trim: true, default: UserStatusEnum.REVIEW })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = { name: 'user', schema: UserSchema }