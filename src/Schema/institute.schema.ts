import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "./base.schema";

export type InstituteDocument = HydratedDocument<Institute>
@Schema({ timestamps: true })
export class Institute extends Base {
    @Prop({ type: String, required: true, unique: true })
    name: string;
}

export const InstituteSchema = SchemaFactory.createForClass(Institute)
export const InstituteModel = { name: 'institute', schema: InstituteSchema } 