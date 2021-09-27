import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/db/entities/token.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/users.service';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(TokenEntity)
         private readonly tokensRepository: Repository<TokenEntity>,
        private readonly userService: UserService,
        @Inject(forwardRef(()=>AuthService))
         private readonly authService: AuthService,

    ) { }


    async saveToken(token: string, email: string) {
        let objToken = await this.tokensRepository.findOne({email:email});
        if (objToken) {
            this.tokensRepository.update(objToken.id, {
                token:token,
            })
        } else {
            await this.tokensRepository.insert({
                token: token,
                email:email,
            });
        }

    }
    async refreshToken(oldToken: string){
        const existingToken = await this.tokensRepository.findOne({
            where: {
                token: oldToken,
            }
        });
        if (existingToken) {
            const user = await this.userService.findUserByEmail(existingToken.email);
            return this.authService.login(user);
        } else {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
        }
    }
}
