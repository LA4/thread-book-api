import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly BookService: BooksService) { }


    @Post('/new')
    async createBook(@Body() BookDTO: BookDTO) {
        console.log("controller book, DTO:", BookDTO)

        return this.BookService.createBook(BookDTO)
    }

    @Get()
    getAllBooks() {
        return this.BookService.getAllBooks()
    }

    @Get("/status/Reading")
    getBookReading() {
        return this.BookService.getBookReading()
    }
    @Get("/status/read")
    getBookRead() {
        return this.BookService.getBookRead()
    }
    @Get("/status/toBeRead")
    getBookToBeRead() {
        return this.BookService.getBookToBeRead()
    }

    @Put("/inRead/:book_id/")
    putBookInRead(@Param('book_id') book_id: string, @Body('isReading') isReading: boolean) {
        return this.BookService.putBookInRead(book_id, isReading)
    }


    @Get("/:id")
    getBook(@Param('id') id: string) {

        console.log("controleur get book id:", id)

        return this.BookService.getBook(id)
    }



}
