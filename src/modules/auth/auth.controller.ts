import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './authDto/Auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    async registerUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<CreateUserDto> {
        const newUser = await this.authService.getByEmail(createUserDto);
        return newUser;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return req.user;
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.authService.showById(+id);
    }


}
