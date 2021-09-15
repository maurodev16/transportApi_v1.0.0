import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DriversModule } from '../drivers/drivers.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategyDriver, LocalStrategyUser } from './local.strategy';
@Module({
  imports: [UsersModule, PassportModule, ConfigModule, DriversModule,PassportModule, JwtModule.registerAsync({
    imports:[ConfigModule], inject:[ConfigService],
    useFactory: async (configureService:ConfigService) =>({
      secret:configureService.get(process.env.SECURITY_JWT),
      signOptions:{
        expiresIn: configureService.get(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME)
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersModule, DriversModule, LocalStrategyUser, LocalStrategyDriver, JwtStrategy],
  exports:[AuthService, PassportModule, AuthService],
})
export class AuthModule { }
