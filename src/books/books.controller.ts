import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly BookService: BooksService) { }


    @Post('/post')
    async createBook(@Body() BookDTO: BookDTO) {
        console.log("controller book, DTO:", BookDTO)

        return this.BookService.createBook(BookDTO)
    }

    @Get()
    getAllBooks() {
        return this.BookService.getAllBooks()
    }
    @Get("/:id")
    getBook(@Param('id') id: string) {

        console.log("controleur get book id:", id)

        return this.BookService.getBook(id)
    }

}
