import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {
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
    
    /****REGISTER USER****/
    async registerUser(userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        userData.password = await EncryptUtil.hashPassword(userData.password);
        try {
            const newUser = await this.createUser({ ...userData, password: userData.password });
            return userData;
    
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
    }
        
    async getAllUsers():Promise<UserEntity[]>{
        return this.userRepository.find();
    }


    async findUserByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOne({ email });
        try {
            if (user) {
                return user;
            }
        } catch (error) {

            throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);
        }
    }
    
}