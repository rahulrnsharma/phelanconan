import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AdminDocument = HydratedDocument<Admin>

@Schema({timestamps:true})
export class Admin{
    @Prop({type:String})
    name: string;

    @Prop({type:String,required:true,index:true})
    username: string;

    @Prop({type:String})
    password: string; 

    @Prop({ type: Boolean, default: true })
    isLoggedIn: boolean;
    @Prop({ type: Date, required: true })
    loggedInAt: Date;
    @Prop({ type: Date })
    loggedOutAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export const AdminModel = {name:'admin',schema:AdminSchema}