import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/db/entities/auth.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './authDto/Auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private authRepository: Repository<AuthEntity>
    ) { }

    async getByEmail(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        createUserDto.password = await EncryptUtil.hashPassword(createUserDto.password);
        const newUser = await this.authRepository.findOne(createUserDto.email);
        if (newUser && newUser.password === createUserDto.password) {
            const newUser = await this.authRepository.create(createUserDto);
            await newUser.save();
            delete newUser.password;
            const { password, ...user } = newUser;
            return newUser;
        }
        return null;

    }

    async showById(id: number): Promise<AuthEntity> {
        const user = await this.findById(id);
        delete user.password;
        return user;
    }

    async findById(id: number) {
        return await AuthEntity.findOne(id);
    }


    async findByEmail(email: string) {
        return await AuthEntity.findOne({ where: { email: email } })
    }

}
