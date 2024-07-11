import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book.dto';

export type BookUpdated = {
    _id: number;
    title: string;
    pages: string;
    pageRead: number;
    author: string;
    category: string;
    publisher: string;
    resume: string;
    opinion: string;
    status: string;
}

@Controller('books')
export class BooksController {
    constructor(private readonly BookService: BooksService) { }


    @Post('/new')
    async createBook(@Body() BookDTO: BookDTO) {

        return this.BookService.createBook(BookDTO)
    }

    @Get('/:userId')
    getAllBooks(@Param('userId') userId: string, @Query('documentToSkip') documentToSkip?: number, @Query('limitOfDocuments') limitOfDocuments?: number) {
        return this.BookService.getAllBooks(userId, documentToSkip, limitOfDocuments)
    }
    @Get('status/:userId')
    getBooksStatus(@Param('userId') userId: string, @Query('status') status: string, @Query('documentToSkip') documentToSkip?: number, @Query('limitOfDocuments') limitOfDocuments?: number) {

        return this.BookService.getBooksStatus(userId, status, documentToSkip, limitOfDocuments)
    }

    @Get("/status/Reading/:user_id")
    getBookReading(@Param('user_id') user_id: string) {
        return this.BookService.getBookReading(user_id)
    }
    @Get("/status/read/:user_id")
    getBookRead(@Param('user_id') user_id: string) {
        return this.BookService.getBookRead(user_id)
    }
    @Get("/status/toBeRead/:user_id")
    getBookToBeRead(@Param('user_id') user_id: string) {
        return this.BookService.getBookToBeRead(user_id)
    }

    @Get("/:id/:user_id")
    getBook(@Param('id') id: string, @Param('user_id') userId: string) {

        return this.BookService.getBook(id, userId)
    }

    @Patch("/update/:user_id")
    modifyBook(@Param('user_id') user_id: string, @Body() BookUpdated: BookUpdated) {
        return this.BookService.modifyBook(BookUpdated, user_id)

    }
    @Delete("/delete/:id/:user_id")
    deleteBook(@Param('id') bookToDelete: string, @Param('user_id') user_id: string) {
        return this.BookService.deleteBook(bookToDelete, user_id)

    }


}
