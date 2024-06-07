import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book.dto';
import { promises } from 'dns';

@Controller('books')
export class BooksController {
    constructor(private readonly BookService: BooksService) { }


    @Post('/post')
    async createBook(@Body() BookDTO: BookDTO): Promise<BookDTO> {

        return this.BookService.createBook(BookDTO)
    }

    @Get()
    getAllBooks() {
        console.log(this.BookService.getAllBooks())
        return this.BookService.getAllBooks()
    }

}
