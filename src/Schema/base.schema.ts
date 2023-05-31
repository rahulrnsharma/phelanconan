import { Prop } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

export class Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, select: false })
    createdBy: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, select: false })
    updatedBy: ObjectId;
    @Prop({ type: Date })
    createdAt: Date;
    @Prop({ type: Date })
    updatedAt: Date;
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}