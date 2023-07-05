import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";

export type CourseDocument = HydratedDocument<Course>

@Schema({ timestamps: true })
export class Course extends Base {
    @Prop({ type: String, require: true, unique: true, trim: true })
    name: string;
    @Prop({ type: String, default: '' })
    hood: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course)
export const CourseModel = { name: 'course', schema: CourseSchema }