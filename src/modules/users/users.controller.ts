import { Body, Controller, Get, Param, Post, UseGuards, Req, NotFoundException, HttpCode, Patch, ParseIntPipe } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/localAuth.guard';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() request) {
    return this.authService.login(request.user);
  }

  @Post('register-user')
  async registerUser(@Body() registrationUserData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    return this.userService.registerUser(registrationUserData);
  }


  @Get('users')
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe)userId:number, @Body() userData: Partial<UserEntity>):Promise<UserEntity>{
      userData.id = userId;
      const updatedUser = await this.userService.updateUser(userData);
      return updatedUser;
    }

}
