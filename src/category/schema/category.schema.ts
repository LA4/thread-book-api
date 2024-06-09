import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
    @Prop()
    name: string
    @Prop()
    book: { type: Types.ObjectId, ref: 'Book' }

}
export const CategorySchema = SchemaFactory.createForClass(Category)