import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class BookDTO {

    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @MinLength(3)
    author: string;

    @IsNotEmpty()
    @MinLength(3)
    bookGenre: string;

    @IsNotEmpty()
    pages: number;

    @IsNotEmpty()
    @MinLength(3)
    resume: string;

    @IsString()
    opignon: string;
}