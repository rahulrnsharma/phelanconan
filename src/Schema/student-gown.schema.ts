import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";
import { HeightTypeEnum } from "src/enum/common.enum";

export type CeremonyDocument = HydratedDocument<StudentGown>

@Schema({ timestamps: true })
export class StudentGown extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    institute: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    faculty: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    course: ObjectId;
    @Prop({ type: Date, required: true })
    date: Date;
    @Prop({ type: String, required: true })
    time: string;
    @Prop({ type: Number, required: true })
    price: number
    @Prop({ type: String, enum: HeightTypeEnum, trim: true })
    height: string;
    @Prop({ type: String, required: true })
    size: string;
    @Prop({ type: String, required: true })
    requirement: string;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, lowercase: true, trim: true })
    email: string;
    @Prop({ type: String, required: true, trim: true })
    phone: string;
    @Prop({ type: String, required: true, trim: true })
    addressLine: string;
    @Prop({ type: String, default: "", trim: true })
    addressLine1: string;
    @Prop({ type: String, required: true, trim: true })
    zipcode: string;
    @Prop({ type: String, required: true, trim: true })
    city: string;
    @Prop({ type: String, required: true, trim: true })
    country: string;
}

export const StudentGownSchema = SchemaFactory.createForClass(StudentGown);
export const StudentGownModel = { name: 'student-gown', schema: StudentGownSchema }