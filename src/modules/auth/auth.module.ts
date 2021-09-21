import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DriversModule } from '../drivers/drivers.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategyDriver } from './local.strategyDriver';
import { LocalStrategyUser } from './local.strategyUser';
@Module({
  imports: [UsersModule, PassportModule, ConfigModule, DriversModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configureService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }
      })
    })],
  controllers: [AuthController],
  providers: [AuthService, UsersModule, DriversModule, LocalStrategyUser, LocalStrategyDriver, JwtStrategy],
  exports: [AuthService, PassportModule, AuthService],
})
export class AuthModule { }
