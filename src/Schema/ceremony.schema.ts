import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Base } from "./base.schema";

export type CeremonyDocument = HydratedDocument<Ceremony>

@Schema({ timestamps: true })
export class Ceremony extends Base {
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
    @Prop({ type: String, default: null, get: (image: string) => `${process.env.DOC_BASE_URL}phelanconan/institute/${image}` })
    image: string;
}

export const CeremonySchema = SchemaFactory.createForClass(Ceremony);
export const CeremonyModel = { name: 'ceremony', schema: CeremonySchema }