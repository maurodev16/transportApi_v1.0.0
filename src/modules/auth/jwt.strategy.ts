import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import { Request } from 'express';
import { DriverService } from "../drivers/drivers.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly driverService:DriverService,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request)=>{
                return request?.cookies?.Authentication;
            }]),
            ignoreExpiration:false,
            secretOrKey:configService.get(process.env.CONST_JWT),
        });
    }

    async validateUser(payload:TokenPayload){
        return this.userService.getUserById(payload.id);
    }

    async validateDriver(payload:TokenPayload){
        return this.driverService.getDriverById(payload.id)
    }
}