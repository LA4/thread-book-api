import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }


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
}
