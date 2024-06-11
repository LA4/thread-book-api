import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Category } from "src/category/schema/category.schema";

export type AuthorDocument = HydratedDocument<Author>

@Schema()
export class Author {
    @Prop()
    name: string
}
export const AuthorSchema = SchemaFactory.createForClass(Category)