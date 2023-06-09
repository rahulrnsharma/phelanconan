import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";
import { HeightTypeEnum, PaymentStatusEnum } from "src/enum/common.enum";

export type StudentGownDocument = HydratedDocument<StudentGown>
@Schema()
export class Guest {
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, default: "" })
    lastName: string;
    @Prop({ type: String, required: true, trim: true })
    email: string
    @Prop({ type: String, required: true, trim: true })
    ticket: string;
}
export const GuestSchema = SchemaFactory.createForClass(Guest);

@Schema({ timestamps: true })
export class StudentGown extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    institute: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    faculty: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    course: ObjectId;
    @Prop({ type: Date, required: true })
    date: Date;
    @Prop({ type: String, required: true })
    time: string;
    @Prop({ type: Number, required: true })
    price: number
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
    countryCode: string;
    @Prop({ type: String, required: true, trim: true })
    phone: string;
    @Prop({ type: String, required: true, trim: true })
    addressLine: string;
    @Prop({ type: String, default: "", trim: true })
    addressLine1: string;
    @Prop({ type: String, required: true, trim: true })
    zipcode: string;
    @Prop({ type: String, required: true, trim: true })
    city: string;
    @Prop({ type: String, required: true, trim: true })
    country: string;
    @Prop({ type: String, enum: PaymentStatusEnum, trim: true, default: PaymentStatusEnum.PENDING })
    paymentStatus: string;
    @Prop({ type: String, required: false, trim: true })
    orderId: string;
    @Prop({ type: String, required: false, trim: true })
    orderNumber: string;
    @Prop({ type: [GuestSchema], required: false, default: [] })
    guest: Guest[];
    @Prop({ type: String, required: true })
    collectionLocation: string
    @Prop({ type: String, required: true })
    collectionTime: string;
    @Prop({ type: Boolean, required: true })
    cap: boolean;
    @Prop({ type: String, required: true })
    returnLocation: string
    @Prop({ type: Date, required: true })
    deadline: Date;
    @Prop({ type: Number, required: true })
    refno: number;
    @Prop({ type: String, default: '' })
    hood: string;

}

export const StudentGownSchema = SchemaFactory.createForClass(StudentGown);
export const StudentGownModel = { name: 'student-gown', schema: StudentGownSchema }