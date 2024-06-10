import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Book } from "src/books/schema/books.schema";


export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
    @Prop()
    name: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    book: Book

}
export const CategorySchema = SchemaFactory.createForClass(Category)