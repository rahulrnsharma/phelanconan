import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "./base.schema";

export type TransactionDocument = HydratedDocument<Transaction>
@Schema({ timestamps: true })
export class Transaction extends Base {
    @Prop({ type: String })
    orderId: string
    @Prop({ type: String })
    transactionId: string
    @Prop({ type: Object })
    data: [Object]
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
export const TransactionModel = { name: 'transaction', schema: TransactionSchema } 