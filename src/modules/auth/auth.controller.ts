import { Controller, Post, UseGuards, HttpCode, Req, Res, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuth.guard';
import RequestWithDriver from './requestWithDriver.interface';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  /********Login Driver************ */
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login-driver')
  async loginDriver(@Req() request: RequestWithDriver, @Res() response: Response) {
    try {
      const { driver } = request;
      const cookie = this.authService.getCookieWithJwtToken(driver.id);
      response.set('Set-Cookie', cookie);
      driver.password = undefined;
      return response.send(driver);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  /********Auth Driver************ */
  @UseGuards(JwtAuthenticationGuard)
  @Get('auth-driver')
  authenticateDriver(@Req() request: RequestWithDriver) {
    const driver = request.driver;
    driver.password = undefined;
    return driver;
  }


  /********Login User************ */
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login-user')
  async loginUser(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.set('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }


  /********Auth User************ */
  @UseGuards(JwtAuthenticationGuard)
  @Get('auth-user')
  authenticateUser(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  /**********LogOut*************/
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

}
