import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedArraySubdocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";

export type StaffCeremonyDocument = HydratedArraySubdocument<StaffCeremony>
@Schema({ timestamps: true })
export class StaffCeremony extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    institute: ObjectId;
    @Prop({ type: Date, required: true })
    date: Date;
    @Prop({ type: String, required: true })
    time: string;
    @Prop({ type: String, default: null, get: (image: string) => `${process.env.DOC_BASE_URL}phelanconan/institute/${image}` })
    image: string;
    @Prop({ type: String, required: true })
    duration: string;
    @Prop({ type: String, required: true })
    refno: string;
    @Prop({ type: Number, required: true, default: 0 })
    price: number
    @Prop({ type: Date, required: true })
    deadline: Date;

}
export const StaffCeremonySchema = SchemaFactory.createForClass(StaffCeremony);
export const StaffCeremonyModel = { name: 'staff-ceremony', schema: StaffCeremonySchema }