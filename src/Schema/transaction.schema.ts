import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "./base.schema";

export type TransactionDocument = HydratedDocument<Transaction>
@Schema({ timestamps: true })
export class Transaction extends Base {
    @Prop({ type: String, required: true, unique: true })
    orderId: string;
    @Prop({ type: String, required: true })
    transactionId: string;
    @Prop({ type: Object })
    card: Object;
    @Prop({ type: Object })
    version: Object;
    @Prop({ type: Object })
    authenticate: Object;
    @Prop({ type: Object })
    authorization: Object;
    @Prop({ type: Object })
    failed: Object;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
export const TransactionModel = { name: 'transaction', schema: TransactionSchema } 