import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/db/entities/AuthEntity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([AuthEntity])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
