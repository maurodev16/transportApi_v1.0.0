import { Body, Controller, Get, Param, Post, UseGuards, Req, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/db/entities/user.entity';
import { LocalAuthenticationGuardUser } from '../auth/localAuth.guard';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get('users')
    async getAllUsers():Promise<UserEntity[]>{
        return this.userService.getAllUsers();
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuardUser)
    @Post('login-user')
    async loginUser(@Req() request){
      const user = request.user;
      return user;
    }
  
}
