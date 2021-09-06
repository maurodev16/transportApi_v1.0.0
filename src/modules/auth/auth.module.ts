import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/db/entities/auth.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([AuthEntity]), UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  
})
export class AuthModule {}
