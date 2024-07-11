import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDTO, UserLoginDTO, UserRegisterDTO } from 'src/user/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async validateUser(email: string, password: string) {
        const user: User = await this.userService.findUser(email)
        if (!(user)) {
            throw new BadRequestException("User not found")
        }
        const isCorrect: boolean = await bcrypt.compare(password, user.password)
        if (!isCorrect) {
            throw new BadRequestException('invalid password')
        }
        return user
    }


    async login(user: UserLoginDTO) {
        const existingUser = this.userService.findUser(user.email)
        if (!existingUser) {
            throw new BadRequestException('The user does not exist')
        }
        await this.validateUser(user.email, user.password);

        const payload = { email: user.email, id: user.id }

        return { access_token: this.jwtService.sign(payload) }

    }



    async register(user: UserRegisterDTO) {
        const existingUser = await this.userService.findUser(user.email)
        if (existingUser) {
            throw new BadRequestException('The user alread exist')
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser: UserRegisterDTO = { ...user, password: hashedPassword }
        await this.userService.createUser(newUser)
        return this.login(user)

    }
}
