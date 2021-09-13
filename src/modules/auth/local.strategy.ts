import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) { super({usernameField:'email'}); }
    async validate(username:string, password:string) {
        const userDriver = await this.authService.validateUserOrDriver(username, password);
        if (userDriver) {
            return userDriver;
        } else {
            throw new UnprocessableEntityException();
        }

    }
}



