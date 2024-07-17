import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/books/schema/books.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Favorite, FavoriteDocument } from './schema/favorite.schema';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';
import { Author, AuthorDocument } from 'src/author/schema/author.schema';
import { Publisher, PublisherDocument } from 'src/publisher/schema/publisher.schema';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(Publisher.name) private publisherModel: Model<PublisherDocument>,
    ) { }

    async addFavoriteBook(favoriteElements: { userId: string, bookId: string }) {

        const user = await this.userModel.findById(favoriteElements.userId).exec()
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const existingBook = await this.bookModel.findById(favoriteElements.bookId).exec()
        if (!existingBook) {
            throw new ConflictException('This book was not already register')
        }

        const alreadyFavorite = await this.favoriteModel.findOne({ user: user._id }).lean()
        if (!alreadyFavorite) {
            const favorite = new this.favoriteModel({
                user: favoriteElements.userId,
                book: favoriteElements.bookId
            })
            return favorite.save()
        }
        const updateFavorite = this.favoriteModel.findByIdAndUpdate(
            alreadyFavorite._id,
            { book: favoriteElements.bookId }
        );

        return updateFavorite
    }
    async getFavotites(userId: string) {
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const favorite = await this.favoriteModel.findOne({ user: userId })

        const bookInfo = await this.bookModel.findById(favorite.book).populate('author').populate('category').populate('publisher').exec()
        return bookInfo

    }
}
