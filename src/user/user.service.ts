import { BadRequestException, ConflictException, Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { Book, BookDocument } from 'src/books/schema/books.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ) { }


    async getUserById(userId: string) {
        const user = this.userModel.findById(userId).exec()
        if (!user) {
            throw new BadRequestException()
        }
        return user
    }
    async createUser(user: UserDTO) {
        const excistingUser = await this.userModel.findOne({ email: user.email }).exec()
        console.log(excistingUser)
        if (excistingUser) {
            throw new ConflictException('This Email was already register')
        }
        const createUser = new this.userModel(user);
        return createUser.save()

    }
    async getBooksFromUser(userId: string) {
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            throw new BadRequestException("User does'nt exist")
        }
        const books = await this.bookModel.find({ user: userId }).exec()
        return books
    }

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email: email })

        return user
    }


}
