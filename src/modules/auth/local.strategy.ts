import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./authDto/Auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }


    async validate(createUserDto: CreateUserDto): Promise<CreateUserDto>{
        const user = await this.authService.getByEmail(createUserDto);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}



