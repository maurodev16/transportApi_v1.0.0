import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return req.user;
    }

    // @Get(':id')
    // show(@Param('id') id: string) {
    //     return this.userService.showById(+id);
    // }
}
