import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, Types } from 'mongoose';
import { Category } from '../../category/schema/category.schema';
import { Type } from 'class-transformer';
import { Author } from 'src/author/schema/author.schema';
import { User } from 'src/user/schema/user.schema';
import { Publisher } from 'src/publisher/schema/publisher.schema';
import { Book } from 'src/books/schema/books.schema';

export type FavoriteDocument = HydratedDocument<Favorite>;
@Schema()
export class Favorite {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    @Type(() => User)
    user: User
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book" })
    @Type(() => User)
    book: Book


}

export const FavariteSchema = SchemaFactory.createForClass(Favorite);
