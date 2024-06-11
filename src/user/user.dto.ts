import { Type } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";
import { Book } from "src/books/schema/books.schema";

export class UserDTO {

    @MinLength(3)
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @Type(() => Book)
    books: Book[];
}