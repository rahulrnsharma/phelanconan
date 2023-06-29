import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "./base.schema";
import { HeightTypeEnum, LocationTypeEnum } from "src/enum/common.enum";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";


export type StaffGownDocument = HydratedDocument<StaffGown>
@Schema({ timestamps: true })
export class StaffGown extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    institute: ObjectId;
    @Prop({ type: String, required: true })
    refno: string;
    @Prop({ type: Number, required: true , default:0})
    price: number
    @Prop({ type: Date, required: true })
    date: Date;
    @Prop({ type: String, required: true })
    time: string;
    @Prop({ type: String, required: true })
    duration: string;
    @Prop({ type: String, required: true })
    graduated: string;
    @Prop({ type: String,enum:LocationTypeEnum,trim:true, required: true })
    location: string;
    @Prop({ type: String, required: true })
    year: string;
    @Prop({ type: String, required: true })
    faculty: string;
    @Prop({ type: String, required: false, })
    faculty_opt: string;
    @Prop({ type: String, required: true })
    qualification: string;
    @Prop({ type: String, required: false })
    qualification_opt: string;
    @Prop({ type: String, enum: HeightTypeEnum, trim: true })
    height: string;
    @Prop({ type: String, required: true })
    size: string;
    @Prop({ type: String, default: "" })
    requirement: string;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, lowercase: true, trim: true })
    email: string;
    @Prop({ type: String, required: true, trim: true })
    phone: string;
    @Prop({ type: String, required: true, trim: true })
    orderNumber: string;
    @Prop({ type: String, required: true, trim: true })
    countryCode: string;

}

export const StaffGownSchema = SchemaFactory.createForClass(StaffGown)
export const StaffGownModel = { name: 'staff-gown', schema: StaffGownSchema }