import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { DriverEntity } from "src/db/entities/driver.entity";
import { UserEntity } from "src/db/entities/user.entity";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategyDriver extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({passwordField: 'password', usernameField: 'email'});
    }
    async validate(username: string, password: string): Promise<Partial<DriverEntity>> {
        const driver = await this.authService.getAuthenticatedDriver(username, password);
        if (driver) {
            return driver;
        } else {
            throw new UnauthorizedException();
        }
    }
}




