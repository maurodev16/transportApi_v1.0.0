import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }


    async createUser(userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        const newUser = await this.userRepository.create(userData);
        try {
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }


    async findUserByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOne({ email });
        try {
            if (user) {
                return user;
            }
        } catch (error) {

            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
        }
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ id });
        try {
            if (user) {
                return user;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    async getAllUsers():Promise<UserEntity[]>{
        return this.userRepository.find();
    }


}