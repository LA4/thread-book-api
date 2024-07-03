import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { Book } from "src/books/schema/books.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop()
    username: string
    @Prop()
    email: string
    @Prop()
    password: string

    // @Type(() => Book)
    // books: Book[];

}
export const UserSchema = SchemaFactory.createForClass(User)