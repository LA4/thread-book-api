import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, Types } from 'mongoose';
import { Category } from '../../category/schema/category.schema';
import { Type } from 'class-transformer';

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category: Category
  // @Prop({ type: String })
  // category: string

  @Prop()
  pages: number;

  @Prop({ type: Date, default: new Date() })
  created_at: Date;

  @Prop()
  resume: string;

  @Prop()
  opinion: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
