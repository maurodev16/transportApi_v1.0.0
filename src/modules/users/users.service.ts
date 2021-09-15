import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    async registerUser(userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        userData.password = await EncryptUtil.hashPassword(userData.password);
        const newUser = await this.userRepository.save(userData);
        const { password, ...user } = newUser;
        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            return user;
        } else {
            throw new HttpException('user_with_this_email_does_not_exist', HttpStatus.NOT_FOUND);
        }
    }


    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

}
