import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose, ObjectId } from "mongoose";
import { Base } from "./base.schema";

export type FacultyDocument = HydratedDocument<Faculty>

@Schema({ timestamps: true })
export class Faculty extends Base {
    @Prop({ type: String, required: true, unique: true, trim: true })
    name: string
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
export const FacultyModel = { name: 'faculty', schema: FacultySchema }