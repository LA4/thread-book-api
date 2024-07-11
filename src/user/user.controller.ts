import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserLoginDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) { }

    @Get("/:email")
    async getUserByMail(@Param('email') email: string) {
        console.log(email)
        const userInfo = await this.UserService.findUser(email)
        const { password, ...userProtected } = userInfo;
        return userProtected

    }
}
