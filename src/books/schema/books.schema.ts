import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category;
  // @Prop({ type: String })
  // category: string

  @Prop()
  pages: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop()
  resume: string;

  @Prop()
  opinion: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
