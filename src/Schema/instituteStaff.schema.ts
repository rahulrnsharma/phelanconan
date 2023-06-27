import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { ApproveEnum } from "src/enum/common.enum";
export type InstituteStaffDocument = HydratedDocument<InstituteStaff>
@Schema({timestamps:true})
export class InstituteStaff {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true,unique:true })
    institute: ObjectId;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, lowercase: true, trim: true ,unique:true})
    email: string;
    @Prop({ type: String, required: true, trim: true })
    password: string;
    @Prop({ type: String, required: true, trim: true ,unique:true})
    phone: string;
    @Prop({type:String,required:true})
    designation:string
    @Prop({type:String,enum:ApproveEnum,trim:true,default:ApproveEnum.REVIEW})
    status:string
}

export const InstituteStaffSchema = SchemaFactory.createForClass(InstituteStaff)
export const InstituteStaffModel = {name:'Institute-Register-Staff',Schema:InstituteStaffSchema}