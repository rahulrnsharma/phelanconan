import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type CourseDocument = HydratedDocument<Course>
@Schema({})
export class Course{
@Prop({type:mongoose.Schema.Types.ObjectId,required:true})
faculty:ObjectId;
@Prop({type:String,require:true})
name:string;
}

export const CourseSchema = SchemaFactory.createForClass(Course)
export const CourseModel = {name:'course',schema:CourseSchema}