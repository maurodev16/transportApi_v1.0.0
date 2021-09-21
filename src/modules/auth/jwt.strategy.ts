import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import { Request } from 'express';
import { DriverService } from "../drivers/drivers.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly driverService:DriverService,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.secret,
            
        });
    }

    async validateUser(payload:any){
        return this.userService.getUserById(payload.id);
    }

    async validateDriver(payload:any){
        return this.driverService.getDriverById(payload.id)
    }
}