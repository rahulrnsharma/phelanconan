import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";


export type AdminDocument = HydratedDocument<Admin>

@Schema({ timestamps: true })
export class Admin extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'users' })
    user: ObjectId;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, lowercase: true, trim: true, unique: true })
    email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export const AdminModel = { name: 'admin', schema: AdminSchema }