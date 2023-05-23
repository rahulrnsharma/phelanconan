import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>

@Schema({timestamps:true})
export class Event{
@Prop({type:String,required:true,index:true})
institution: string
@Prop({type:[Date],required:true})
gradDate: [Date];
@Prop({type:[Date],required:true})
ceremonyTime: [Date];
@Prop({type:[String]})
faculty: [String];
@Prop({type:[String],required:true})
course:[string]
}