import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose, ObjectId } from "mongoose";

export type FacultyDocument = HydratedDocument<Faculty>

@Schema()
export class Faculty{
@Prop({type:String,required:true})
name: string

@Prop({type: mongoose.Schema.Types.ObjectId,required:true})
institute: ObjectId;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
export const FacultyModel = {name:'faculty',schema:FacultySchema}