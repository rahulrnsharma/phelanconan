import { Prop, Schema } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Form{
    @Prop({type:String,required:true,})
    Institutions: String
}