import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "./base.schema";


export type AdminDocument = HydratedDocument<Admin>

@Schema({ timestamps: true })
export class Admin extends Base {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, index: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, trim: true })
    password: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export const AdminModel = { name: 'admin', schema: AdminSchema }