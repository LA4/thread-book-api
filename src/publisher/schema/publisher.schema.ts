import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PublisherDocument = HydratedDocument<Publisher>
@Schema()
export class Publisher {
    @Prop()
    name: string
}
export const PublisherSchema = SchemaFactory.createForClass(Publisher)