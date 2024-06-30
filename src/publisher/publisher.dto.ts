import { IsNotEmpty, IsString } from "class-validator";

export class PublisherDTO {
    @IsNotEmpty()
    @IsString()
    name: string
}