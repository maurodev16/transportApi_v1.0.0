import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { DriverService } from '../drivers/drivers.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly driverService: DriverService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) { }


        public getCookieWithJwtToken(id: number){
            const payLoad:TokenPayload = {id};
            const token = this.jwtService.sign(payLoad);
            return `Authentication=${token}; 
            HttpOnly; 
            Path=/; 
            Max-Age=${this.configService.get(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME)}`;
        }

        private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
            const isPasswordMatching = await EncryptUtil.verifyPassword(plainTextPassword, hashedPassword);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
        }

    async validateUser(email: string, password: string): Promise<Partial<UserEntity>> {

        try {
            const user = await this.usersService.findUserByEmail(email);
            const isPasswordMatching = await EncryptUtil.verifyPassword(password, user.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong_credentials_provided', HttpStatus.BAD_REQUEST);
            }
            else {
                const { password, ...userResult } = user;
                user.password = undefined;
                return userResult;
            }
        } catch (error) {
            throw new HttpException('Wrong_credentials_provided', HttpStatus.BAD_REQUEST);
        }
    }

 

    async validateDriver(email: string, password: string): Promise<Partial<DriverEntity>> {
        const driver = await this.driverService.findDriverByEmail(email);
        if (driver && (await EncryptUtil.verifyPassword(password, driver.password))) {
            const { password, ...driverResult } = driver;
            return driverResult;
        } else {
            throw new UnauthorizedException();
            return null;
        }
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }
      
    // async loginUser(userData: Partial<UserEntity>): Promise<any> {
    //     const payload = {
    //         firstname: userData.firstname,
    //         lastname: userData.lastname,
    //         email: userData.email,
    //         sub: userData.id,
    //     };
    //     const token = this.jwtService.sign(payload, {
    //         secret: this.configService.get(process.env.CONST_JWT),
    //         expiresIn: `${this.configService.get(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME)}`
    //     });
    //     var tk = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME)}`;
    //     return {
    //         tk,
    //         firstname: userData.firstname,
    //     }
    // }

    // async loginDriver(driverData: Partial<DriverEntity>): Promise<any> {
    //     const payload = {
    //         firstname: driverData.firstname,
    //         lastname: driverData.lastname,
    //         email: driverData.email,
    //         sub: driverData.id,
    //     };
    //     const token = this.jwtService.sign(payload, {
    //         secret: this.configService.get(process.env.CONST_JWT),
    //         expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    //     });
    //     var tk = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    //     return {
    //         tk,
    //         firstname: driverData.firstname,
    //     }
    // }
}
