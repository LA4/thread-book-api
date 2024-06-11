import { BadRequestException, ConflictException, Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


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

}
