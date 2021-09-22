import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { UserEntity } from "src/db/entities/user.entity";
import { UserService } from "../users/users.service";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ passwordField: 'password', usernameField: 'email' });
    }
    async validate(username: string, password: string): Promise<Partial<UserEntity>> {
        const user = await this.authService.validateUser(username, password);

        if (user) {
            return user;

        } else
            throw new UnauthorizedException();

    }
}






