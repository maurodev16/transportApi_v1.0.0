import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './authDto/Auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    async registerUser(
        @Body()
        createUserDto: CreateUserDto,
    ): Promise<CreateUserDto> {
        const newUser = await this.authService.registerUser(createUserDto);
        return newUser;
    }

    @Get(':id')
    show(@Param('id')id:string){
        return this.authService.showById(+id);
    }
}
