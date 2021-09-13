import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UsersService } from './users.service';
import { UserEntity } from 'src/db/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Post('register')
    async registerUser(
        @Body() userData: Partial<UserEntity>,
    ): Promise<Partial<UserEntity>>{
        const newUser = await this.userService.registerUser(userData);
        return newUser;
    }

    
}
