import { Body, Controller, Get, Param, Post, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/db/entities/user.entity';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Post('register')
    async registerUser(
        @Body() userData: Partial<UserEntity>): 
        Promise<Partial<UserEntity>>{
        const newUser = await this.userService.registerUser(userData);
        if (!newUser) {
            throw new NotFoundException('USER not found:::::');
        } else { return newUser; }
      
    }
    
}
