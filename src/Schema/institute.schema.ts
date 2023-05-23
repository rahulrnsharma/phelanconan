import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaType } from "mongoose";

export type InstituteDocument = HydratedDocument<Institute>
@Schema({timestamps:true})
export class Institute{
@Prop({type:String,required:true})
institute: string;
@Prop({type:String,required:true,index:true})
code:string
}

export const InstituteSchema = SchemaFactory.createForClass(Institute)
export const InstituteModel = {name:'institute',schema:InstituteSchema} 