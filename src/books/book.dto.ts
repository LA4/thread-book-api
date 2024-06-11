
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Date, Types } from "mongoose";
import { Author } from "src/author/schema/author.schema";
import { Category } from "src/category/schema/category.schema";

export class BookDTO {

    @IsNotEmpty()
    @MinLength(3)
    title: string;


    @Type(() => Author)
    author: Author;

    @Type(() => Category)
    category: Category;


    @IsNotEmpty()
    pages: number;

    @IsNotEmpty()
    created_at: Date

    @IsNotEmpty()
    @MinLength(3)
    resume: string;

    @IsString()
    opinion: string;
}