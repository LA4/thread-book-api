import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, pass: string): Promise<any> {
        const user: any = await this.userService.findUser(email)
        // bcrypt ici ?
        if (user && user.password === pass) {
            const userFree = {
                id: user._id,
                username: user.username,
                email: user.email,
            }
            return userFree;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, bub: user.userId }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
