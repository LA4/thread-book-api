import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, Types } from 'mongoose';
import { Category } from '../../category/schema/category.schema';
import { Type } from 'class-transformer';
import { Author } from 'src/author/schema/author.schema';
import { User } from 'src/user/schema/user.schema';
import { BookStatus } from '../book.dto';
import { Publisher } from 'src/publisher/schema/publisher.schema';

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Author.name })
  @Type(() => Author)
  author: Author
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Publisher.name })
  @Type(() => Publisher)
  publisher: Publisher

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category: Category

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User


  @Prop()
  pages: number;

  @Prop({ type: Date, default: new Date() })
  created_at: Date;

  @Prop()
  resume: string;

  @Prop()
  opinion: string;

  @Prop()
  status: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
