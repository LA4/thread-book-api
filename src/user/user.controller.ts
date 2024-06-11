import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) { }


    @Get("/:id")
    getUserById(@Param('id') id: string) {

        return this.UserService.getUserById(id)
    }
    @Post('/new')
    async createUser(@Body() user: UserDTO) {

        return this.UserService.createUser(user)
    }
}
