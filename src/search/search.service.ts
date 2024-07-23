import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/books/schema/books.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ){}


    async searchBook(userId :string, query: string){
        let user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found'); 
        }
        const book = await this.bookModel.find({user :userId, 
            title: {$regex:query, $options:"i" }
        })
        return book
    }
}
