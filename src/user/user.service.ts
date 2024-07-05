import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserLoginDTO } from './user.dto';
import { Book, BookDocument } from 'src/books/schema/books.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        private jwtService: JwtService
    ) { }


    async getUserById(userId: string) {
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            throw new BadRequestException()
        }
        return user
    }
    // async createUser(user: UserLoginDTO) {
    //     const excistingUser = await this.userModel.findOne({ email: user.email }).exec()
    //     if (excistingUser) {
    //         throw new ConflictException('This Email was already register')
    //     }

    //     const hashPassword = await bcrypt.hash(user.password, 10)
    //     const createUser = new this.userModel({ ...user, password: hashPassword });
    //     const payload = { email: createUser.email, sub: createUser._id }
    //     const token = this.jwtService.sign(payload)
    //     console.log(token)
    //     // return createUser.save()

    // }
    // async getBooksFromUser(userId: string) {
    //     const user = await this.userModel.findById(userId).exec()
    //     if (!user) {
    //         throw new BadRequestException("User does'nt exist")
    //     }
    //     const books = await this.bookModel.find({ user: userId }).exec()
    //     return books
    // }

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email: email })

        return user
    }


}
