import { Type } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";
import { isObjectIdOrHexString } from "mongoose";
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


export class UserLoginDTO {

    @IsNotEmpty()
    id?: string
    @MinLength(3)
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @MinLength(8)
    @IsNotEmpty()
    password: string

}


export class UserRegisterDTO {

    @MinLength(3)
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @MinLength(8)
    @IsNotEmpty()
    password: string

}

