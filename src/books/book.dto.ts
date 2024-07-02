
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Date, Types } from "mongoose";
import { Author } from "src/author/schema/author.schema";
import { Category } from "src/category/schema/category.schema";
import { Publisher } from "src/publisher/schema/publisher.schema";
import { User } from "src/user/schema/user.schema";
export enum BookStatus {
    READ = 'READ',
    CURRENTLY_READING = 'CURRENTLY_READING',
    TO_BE_READ = 'TO_BE_READ',
}
export class BookDTO {

    @IsNotEmpty()
    @MinLength(3)
    title: string;


    @Type(() => Author)
    author: Author;

    @Type(() => Category)
    category: Category;

    @Type(() => Publisher)
    publisher: Publisher;

    @Type(() => User)
    user: User;



    @IsNotEmpty()
    pages: number;

    @IsNotEmpty()
    created_at: Date

    @IsNotEmpty()
    @MinLength(3)
    resume: string;

    @IsString()
    opinion: string;

    @IsEnum(BookStatus)
    status: BookStatus;
}