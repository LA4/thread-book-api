import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  bookGenre: string;

  @Prop()
  pages: number;

  @Prop()
  resume: string;

  @Prop()
  opignon: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
