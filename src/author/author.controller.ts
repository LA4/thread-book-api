import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDTO } from './author.dto';

@Controller('author')
export class AuthorController {

    constructor(private readonly AuthorService: AuthorService) { }

    @Post('/new')
    createAuthor(@Body() author: AuthorDTO) {
        console.log(author)
        return this.AuthorService.createAuthor(author)
    }

    @Get()
    getAllAuthor() {
        return this.AuthorService.getAllAuthor()
    }

}
