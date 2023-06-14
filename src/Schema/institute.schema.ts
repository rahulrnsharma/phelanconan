import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "./base.schema";

export type InstituteDocument = HydratedDocument<Institute>
@Schema({ toJSON: { getters: true, virtuals: true }, toObject: { getters: true, virtuals: true } })
class Gallery {
    @Prop({ type: String, default: null, get: (image: string) => `${process.env.DOC_BASE_URL}phelanconan/institute/${image}` })
    image: string;
}
const GallerySchema = SchemaFactory.createForClass(Gallery);
@Schema({ timestamps: true })
export class Institute extends Base {
    @Prop({ type: String, required: true, unique: true, trim: true })
    name: string;
    @Prop({ type: Number, required: true })
    price: number
    @Prop({ type: [GallerySchema], required: false, default: [] })
    gallery: Gallery[];
}

export const InstituteSchema = SchemaFactory.createForClass(Institute)
export const InstituteModel = { name: 'institute', schema: InstituteSchema } 