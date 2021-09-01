import { Body, Controller, Post } from '@nestjs/common';
import { AuthEntity } from 'src/db/entities/AuthEntity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    async registerUser(
        @Body()
        authData: Partial<AuthEntity>,
    ): Promise<Partial<AuthEntity>> {
        const newUser = await this.authService.registerUser(authData);
        return newUser;

    }
}
