import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";

export type StaffDocument = HydratedDocument<Staff>
@Schema({ timestamps: true })
export class Staff extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'users' })
    user: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    institute: ObjectId;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, lowercase: true, trim: true })
    email: string;
    @Prop({ type: String, required: true, trim: true })
    countryCode: string;
    @Prop({ type: String, required: true, trim: true })
    phone: string;
    @Prop({ type: String, required: true })
    designation: string
}

export const StaffSchema = SchemaFactory.createForClass(Staff)
export const StaffModel = { name: 'staff', Schema: StaffSchema }