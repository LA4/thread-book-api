import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/books.schema';
import { Model, Types } from 'mongoose';
import { BookDTO, BookStatus } from './book.dto';
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

        let user = await this.userModel.findById(BookDTO.user)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existingBook = await this.bookModel.findOne({ user: user._id, title: BookDTO.title }).exec()
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

        const createBook = new this.bookModel({
            ...BookDTO,
            category: category._id,
            author: author._id,
            publisher: publisher._id,
            user: user._id
        });

        return createBook.save();

    }

    async getAllBooks(userId: string, documentToShip = 0, limitOfDocuments?: number, startId?: string) {
        let user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const query = this.bookModel.find({
            user: user._id,
            ...(startId && { _id: { $gt: startId } })
        })
            .sort({ _id: -1 })
            .populate('category')
            .populate('author')
            .populate('publisher')
            .skip(documentToShip)

        if (limitOfDocuments) {
            query.limit(limitOfDocuments)
        }

        const results = await query.exec()
        const count = await this.bookModel.countDocuments({ user: user._id }).exec()

        return { results, count };

    }

    async getBooksStatus(userId: string, status: string, documentToShip = 0, limitOfDocuments?: number, startId?: string) {


        let user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const query = this.bookModel.find({
            user: user._id,
            status: status,
            ...(startId && { _id: { $gt: startId } })
        })
            .sort({ _id: -1 })
            .populate('category')
            .populate('author')
            .populate('publisher')
            .skip(documentToShip)

        if (limitOfDocuments) {
            query.limit(limitOfDocuments)
        }

        const results = await query.exec()
        const count = await this.bookModel.countDocuments({ user: user._id, status: status }).exec()

        return { results, count };

    }

    async getBookReading(user_id: string) {
        const bookReading = await this.bookModel.find({ user: user_id, status: "CURRENTLY_READING" }).populate("author").populate("category").populate("publisher").exec()
        return bookReading
    }
    async getBookRead(user_id: string) {
        const bookReading = await this.bookModel.find({ user: user_id, status: "READ" }).populate("author").populate("category").populate("publisher").exec()
        return bookReading
    }
    async getBookToBeRead(user_id: string) {
        const bookReading = await this.bookModel.find({ user: user_id, status: "TO_BE_READ" }).populate("author").populate("category").populate("publisher").exec()
        return bookReading
    }

    async getBook(id: string, userId: string) {
        let user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        const getBook = await this.bookModel.findById(id).populate('author').populate('category').populate('publisher').exec()
        if (!getBook) {
            throw new NotFoundException('This book doe\'snt exist ')
        }

        return getBook
    }


    async modifyBook(BookUpdated: BookUpdated, user_id: string) {

        let user = await this.userModel.findById(user_id)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existingBook = await this.bookModel.findOne({ _id: BookUpdated._id, user: user_id }).exec()
        if (!existingBook) {
            throw new ConflictException('This book do\'nt exist')
        }

        let author = await this.authorModel.findOne({ name: BookUpdated.author }).exec();
        if (!author) {
            const newauthor = new this.authorModel({ name: BookUpdated.author })
            author = await newauthor.save()
        }
        let category = await this.categoryModel.findOne({ name: BookUpdated.category }).exec();
        if (!category) {
            const newCategory = new this.categoryModel({ name: BookUpdated.category })
            category = await newCategory.save()
        }


        let publisher = await this.publisherModel.findOne({ name: BookUpdated.publisher }).exec();
        if (!publisher) {
            const newpublisher = new this.publisherModel({ name: BookUpdated.publisher })
            publisher = await newpublisher.save()
        }

        const updatedBook = await this.bookModel.findByIdAndUpdate(
            BookUpdated._id,
            {
                ...BookUpdated,
                author: author,
                category: category,
                publisher: publisher,

            }, { new: true })

        const userPages = await this.UserReadingPage(user._id.toString())
        return { updatedBook, userPages }

    }

    async deleteBook(bookId: string, user_id: string) {
        const deleteBook = await this.bookModel.deleteOne({ _id: bookId, user: user_id }).exec()
        return deleteBook
    }

    async UserReadingPage(userId: string) {
        const allUserBooks = await this.bookModel.find({ user: userId }).exec()
        let userPageRead = 0
        for (let pages of allUserBooks) {
            userPageRead += pages.pageRead
        }
        const userPages = await this.userModel.findByIdAndUpdate(
            userId,
            { pageRead: userPageRead }, { new: true }
        )
        return userPages.pageRead
    }

}
