import { Controller, Post, UseGuards, Request,  Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { response, Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register-driver')
  async registerDriver(@Body() registrationDriverData: Partial<DriverEntity>): Promise<Partial<DriverEntity>> {
    return this.authService.registerDriver(registrationDriverData);
  }

  @Post('register-user')
  async registerUser(@Body() registrationUserData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    return this.authService.registerUser(registrationUserData);
  }

}
