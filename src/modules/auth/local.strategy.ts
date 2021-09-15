import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { DriverEntity } from "src/db/entities/driver.entity";
import { UserEntity } from "src/db/entities/user.entity";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategyUser extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }
    async validate(username: string, password: string): Promise<Partial<UserEntity>> {
        const user = await this.authService.validateUser(username, password);
        try {
            if (user) {
                return user;
            }
        } catch (error) {
            throw new UnprocessableEntityException();
        }

    }
}

@Injectable()
export class LocalStrategyDriver extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }
    async validate(username: string, password: string): Promise<Partial<DriverEntity>> {
        const driver = await this.authService.validateDriver(username, password);
        if (driver) {
            return driver;
        } else {
            throw new UnprocessableEntityException();
        }
    }
}




