import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/books.schema';
import { Model, Types } from 'mongoose';
import { BookDTO } from './book.dto';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';
import { Author, AuthorDocument } from 'src/author/schema/author.schema';


@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>

    ) { }

    async createBook(BookDTO: BookDTO) {

        const existingBook = await this.bookModel.findOne({ title: BookDTO.title }).exec()
        console.log("existing book:", existingBook)
        if (existingBook) {
            throw new ConflictException('This book was already register')
        }

        let category = await this.categoryModel.findOne({ name: BookDTO.category })
        if (!category) {
            const newCategory = new this.categoryModel({ name: BookDTO.category })
            category = await newCategory.save()
        }
        let author = await this.authorModel.findOne({ name: BookDTO.author })
        if (!author) {
            const newAuthor = new this.authorModel({ name: BookDTO.author })
            author = await newAuthor.save()
        }

        const createBook = new this.bookModel({ ...BookDTO, category: category._id, author: author._id });


        return createBook.save();


    }

    async getAllBooks() {

        const allBooks = await this.bookModel.find()
        console.log("All books", allBooks)
        return allBooks

    }
    async getBook(id: string) {
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
