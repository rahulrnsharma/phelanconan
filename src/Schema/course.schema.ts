import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CourseDocument = HydratedDocument<Course>
@Schema({timestamps:true})
export class Course{
@Prop({type:String,require:true})
course:string;
@Prop({type:String,required:true,index:true})
code:string
}

export const CourseSchema = SchemaFactory.createForClass(Course)
export const CourseModel = {name:'course',schema:CourseSchema}