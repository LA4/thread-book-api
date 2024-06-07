import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/books.schema';
import { Model } from 'mongoose';
import { BookDTO } from './book.dto';




@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDTO>) { }


    async getAllBooks(): Promise<{}> {

        const allBooks = this.bookModel.find()
        console.log(allBooks)
        return allBooks

    }

    async createBook(BookDTO: BookDTO): Promise<BookDTO> {

        const existingBook: BookDTO[] = await this.bookModel.find({ title: BookDTO.title, author: BookDTO.author })
        console.log(existingBook)
        if (existingBook.length < 0) {
            throw new ConflictException('This book was already register')
        }

        const createBook = new this.bookModel(BookDTO)

        return createBook.save()

    }
}
