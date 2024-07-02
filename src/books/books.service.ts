import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/books.schema';
import { Model, Types } from 'mongoose';
import { BookDTO } from './book.dto';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';
import { Author, AuthorDocument } from 'src/author/schema/author.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Publisher, PublisherDocument } from 'src/publisher/schema/publisher.schema';
import { BookUpdated } from './books.controller';


@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(Publisher.name) private publisherModel: Model<PublisherDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>

    ) { }

    async createBook(BookDTO: BookDTO) {
        const existingBook = await this.bookModel.findOne({ title: BookDTO.title }).exec()
        if (existingBook) {
            throw new ConflictException('This book was already register')
        }

        let category = await this.categoryModel.findOne({ name: BookDTO.category })
        if (!category) {
            const newCategory = new this.categoryModel({ name: BookDTO.category })
            category = await newCategory.save()
        }

        let publisher = await this.publisherModel.findOne({ name: BookDTO.publisher })
        if (!publisher) {
            const newPublisher = new this.publisherModel({ name: BookDTO.publisher })
            publisher = await newPublisher.save()
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

        const createBook = new this.bookModel({
            ...BookDTO,
            category: category._id,
            author: author._id,
            publisher: publisher._id,
            user: user._id
        });

        return createBook.save();

    }

    async getAllBooks() {

        const allBooks = await this.bookModel.find()
            .populate('category')
            .populate('author')
            .populate('publisher')
            .populate('user')
            .exec();

        return allBooks;

    }

    async getBookReading() {
        const bookReading = await this.bookModel.find({ status: "CURRENTLY_READING" }).populate("author").populate("category").populate("publisher").exec()
        return bookReading
    }
    async getBookRead() {
        const bookReading = await this.bookModel.find({ status: "READ" }).populate("author").populate("category").populate("publisher").exec()
        return bookReading
    }
    async getBookToBeRead() {
        const bookReading = await this.bookModel.find({ status: "TO_BE_READ" }).populate("author").populate("category").populate("publisher").exec()
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
        const getBook = await this.bookModel.findById(id).populate('author').populate('category').populate('publisher').exec()
        if (!getBook) {
            throw new NotFoundException('This book doe\'snt exist ')
        }

        return getBook
    }


    async modifyBook(BookUpdated: BookUpdated) {

        const existingBook = await this.bookModel.findById(BookUpdated._id).exec()
        if (!existingBook) {
            throw new ConflictException('This book do\'nt exist')
        }

        const author = await this.authorModel.findOne({ name: BookUpdated.author }).exec();
        if (!author) {
            throw new ConflictException('This author does not exist');
        }

        const category = await this.categoryModel.findOne({ name: BookUpdated.category }).exec();
        if (!category) {
            throw new ConflictException('This category does not exist');
        }
        const publisher = await this.publisherModel.findOne({ name: BookUpdated.publisher }).exec();
        if (!publisher) {
            throw new ConflictException('This publisher does not exist');
        }


        const updatedBook = await this.bookModel.findByIdAndUpdate(
            BookUpdated._id,
            {
                ...BookUpdated,
                author: author,
                category: category,
                publisher: publisher,

            }, { new: true })
        console.log(updatedBook)
        return updatedBook

    }

    async deleteBook(bookId: string) {
        const deleteBook = await this.bookModel.deleteOne({ _id: bookId }).exec()
        return deleteBook
    }

}
