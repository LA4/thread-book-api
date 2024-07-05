import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserLoginDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) { }


    @Get("/:id")
    getUserById(@Param('id') id: string) {

        return this.UserService.getUserById(id)
    }
    // @Get("/books/:userId")
    // getBooksFromUser(@Param('userId') userId: string) {

    //     return this.UserService.getBooksFromUser(userId)
    // }
    // @Post('/new')
    // async createUser(@Body() user: UserLoginDTO) {
    //     return this.UserService.createUser(user)
    // }
}
