import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { Book } from "src/books/schema/books.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop()
    username: string
    @Prop({ unique: true })
    email: string
    @Prop()
    password: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book" })
    @Type(() => Book)
    books: Book[];
    @Prop()
    avatar: string

}
export const UserSchema = SchemaFactory.createForClass(User)