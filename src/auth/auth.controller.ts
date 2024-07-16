import { BadRequestException, Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UserDTO, UserLoginDTO, UserRegisterDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('signUp')
    async signUp(@Body() user: UserRegisterDTO) {

        const token = await this.authService.register(user)
        const { password, ...userProtected } = await this.userService.findUser(user.email)
        return { user: userProtected, token }
    }

    @UseGuards(AuthGuard)
    @Get('login')
    async login(@Req() req: any) {
        const user = await this.userService.findUser(req.user.email)
        if (user) {
            return { result: true, email: req.user.email }
        }
        return { result: false }
    }

    @Post('signIn')
    async signIn(@Body() userInfo: any) {
        const user = await this.userService.findUser(userInfo.email)
        if (user) {
            const token = await this.authService.login(userInfo)
            const { password, ...userProtected } = user;
            return { result: true, user: userProtected, token }
        }
        return await this.authService.login(userInfo)
    }


}
