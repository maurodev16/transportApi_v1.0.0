import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async validateUserOrDriver(email:string, password:string): Promise<Partial<UserEntity>> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && (await EncryptUtil.verifyPassword(password,  user.password))) {
          const { password, ...userResult} = user; 
          return userResult; 
        }else{
            throw new UnauthorizedException();
        }
        
    }
}
