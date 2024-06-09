import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/books.schema';
import { Model, Types } from 'mongoose';
import { BookDTO } from './book.dto';




@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDTO>) { }



    async createBook(BookDTO: BookDTO): Promise<BookDTO> {

        const existingBook: BookDTO[] = await this.bookModel.find({ title: BookDTO.title, author: BookDTO.author })
        console.log("existing book:", existingBook.length)
        if (existingBook.length > 0) {
            throw new ConflictException('This book was already register')
        }

        const createBook = new this.bookModel(BookDTO)

        return createBook.save()

    }

    async getAllBooks(): Promise<BookDTO[]> {

        const allBooks = await this.bookModel.find()
        console.log("All books", allBooks)
        return allBooks

    }
    async getBook(id: number): Promise<BookDTO> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        console.log("book id:", id)
        const getBook = await this.bookModel.findById(id).exec()
        console.log(getBook)
        if (!getBook) {
            throw new NotFoundException('This book doe\'snt exist ')
        }
        console.log("book:", !getBook)
        return getBook

    }
}
