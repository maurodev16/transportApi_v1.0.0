import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    public async validateUser(email: string, password: string): Promise<Partial<UserEntity>> {
        try {
            const authUser = await this.userService.findUserByEmail(email);
            if (authUser && bcrypt.compareSync(password, authUser.password)) {
                const { password, ...rest } = authUser;
                return rest;
            }
            return null;
        }
        catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
