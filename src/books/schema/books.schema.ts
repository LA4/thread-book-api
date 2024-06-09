import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  category: { type: Types.ObjectId, ref: 'Category', required: true }

  @Prop()
  pages: number;

  @Prop()
  created_at: Date;

  @Prop()
  resume: string;

  @Prop()
  opignon: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
