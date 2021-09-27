import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly tokenService: TokensService,
    ) { }

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
    async login(user: any)  {
        const payload = {
            username: user.email,
            sub: user.id,
        };

        const token = await this.jwtService.sign(payload);
       await this.tokenService.saveToken(token, user.email)
        return {
            access_token: token,
        }
    }

}
