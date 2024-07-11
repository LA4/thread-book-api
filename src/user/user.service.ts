import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
import { Book, BookDocument } from 'src/books/schema/books.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    ) { }


    async getUserById(userId: string) {
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            throw new BadRequestException()
        }
        return user
    }
    async createUser(user: UserRegisterDTO) {
        const createUser = new this.userModel(user);
        return createUser.save()

    }

    async findUser(email: string) {
        const result = await this.userModel.findOne({ email: email }).lean()
        return result
    }


}
