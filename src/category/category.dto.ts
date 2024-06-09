import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CategoryDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string
}