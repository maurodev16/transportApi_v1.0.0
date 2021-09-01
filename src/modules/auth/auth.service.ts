import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/db/entities/AuthEntity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private authRepository: Repository<AuthEntity>,
    ) { }

    async registerUser(authData: Partial<AuthEntity>): Promise<Partial<AuthEntity>> {
        authData.password = await EncryptUtil.hashPassword(authData.password);
        const newUser = await this.authRepository.save(authData);
        const { password, ...user } = newUser;
        return user;
    }
}
