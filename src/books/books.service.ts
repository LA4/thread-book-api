import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/books.schema';
import { Model, Types } from 'mongoose';
import { BookDTO } from './book.dto';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';
import { Author, AuthorDocument } from 'src/author/schema/author.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';


@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>

    ) { }

    async createBook(BookDTO: BookDTO) {
        console.log("book service", BookDTO)
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
        let user = await this.userModel.findById(BookDTO.user)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const createBook = new this.bookModel({ ...BookDTO, category: category._id, author: author._id, user: user._id });


        return createBook.save();


    }

    async getAllBooks() {

        const allBooks = await this.bookModel.find().populate('category').populate('author').populate('user').exec();
        return allBooks;

    }

    async getBookReading() {
        const bookReading = await this.bookModel.find({ status: "CURRENTLY_READING" }).populate("author").populate("category").exec()
        return bookReading
    }
    async getBookRead() {
        const bookReading = await this.bookModel.find({ status: "READ" }).populate("author").populate("category").exec()
        return bookReading
    }
    async getBookToBeRead() {
        const bookReading = await this.bookModel.find({ status: "TO_BE_READ" }).populate("author").populate("category").exec()
        return bookReading
    }



    async putBookInRead(book_id: string, isReading: boolean) {

        if (isReading) {
            const booksInRead = await this.bookModel.findByIdAndUpdate(
                book_id,
                { $set: { isReading: false } },
                { new: true }
            ).exec()
            return booksInRead
        }
        if (isReading === false) {
            const booksInRead = await this.bookModel.findByIdAndUpdate(

                book_id,
                { $set: { isReading: true } },
                { new: true }
            ).exec()
            return booksInRead
        }

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
