import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategyUser';
import { UserModule } from '../users/users.module';
import { UserController } from '../users/users.controller';
@Module({
  imports: [UserModule, PassportModule, ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configureService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }
      })
    })],
  controllers: [UserController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule { }

