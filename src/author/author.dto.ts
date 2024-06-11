import { IsNotEmpty, IsString } from "class-validator";

export class AuthorDTO {
    @IsNotEmpty()
    @IsString()
    name: string

}