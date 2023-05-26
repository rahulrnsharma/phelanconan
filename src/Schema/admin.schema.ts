import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AdminDocument = HydratedDocument<Admin>

@Schema({timestamps:true})
export class Admin{
    @Prop({type:String})
    name: string;

    @Prop({type:String,required:true,index:true,unique:true})
    username: string;

    @Prop({type:String,trim:true})
    password: string; 

}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export const AdminModel = {name:'admin',schema:AdminSchema}