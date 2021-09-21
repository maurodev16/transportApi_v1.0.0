import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { DriverService } from '../drivers/drivers.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly driverService: DriverService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) { }


    /****REGISTER DRIVER****/
    async registerDriver(driverData: Partial<DriverEntity>): Promise<Partial<DriverEntity>> {
        driverData.password = await EncryptUtil.hashPassword(driverData.password);
        try {
            const newDriver = await this.driverService.createDriver({ ...driverData, password: driverData.password });
            delete driverData.password;
            return newDriver;

        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('Driver with that email already exists', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /****REGISTER USER****/
    async registerUser(userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        userData.password = await EncryptUtil.hashPassword(userData.password);
        try {
            const newUser = await this.usersService.createUser({ ...userData, password: userData.password });
            // delete userData.password;
            return newUser;

        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }


    public async getAuthUser(email: string, password: string): Promise<Partial<UserEntity>> {
        try {
            const user = await this.usersService.findUserByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                const { password, ...rest } = user;
                return rest;
            }
            return null;
        }
        catch (error) {
            throw new HttpException('Wrong credentials provided for User', HttpStatus.BAD_REQUEST);
        }
    }

    public async getAuthenticatedDriver(email: string, password: string): Promise<Partial<DriverEntity>> {
        try {
            const driver = await this.driverService.findDriverByEmail(email);
            if (driver && bcrypt.compareSync(password, driver.password)) {
                const { password, ...rest } = driver;
                return rest;
            }
            return null;
        } catch (error) {
            throw new HttpException('Wrong credentials provided for Driver', HttpStatus.BAD_REQUEST);
        }
    }
}
