import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Date, Types } from "mongoose";

export class BookDTO {

    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @MinLength(3)
    author: string;

    @IsNotEmpty()
    @MinLength(3)
    category: Types.ObjectId

    @IsNotEmpty()
    pages: number;
    @IsNotEmpty()
    created_at: Date;

    @IsNotEmpty()
    @MinLength(3)
    resume: string;

    @IsString()
    opignon: string;
}