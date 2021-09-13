import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) { }

    async registerUser(userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        userData.password = await EncryptUtil.hashPassword(userData.password);
        const newUser = await this.userRepository.findOne(userData.email);
        if (newUser && newUser.password === userData.password) {
            const newUser = await this.userRepository.create(userData);
            await newUser.save();
            delete newUser.password;
            const { password, ...user } = newUser;
            return user;
        }
        return null;
    }
    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }

    async showById(id: number): Promise<UserEntity> {
        const user = await this.findById(id);
        delete user.password;
        return user;
    }

    async findById(id: number) {
        return await UserEntity.findOne(id);
    }



}
