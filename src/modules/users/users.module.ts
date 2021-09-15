import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from 'src/db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  //  AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
   exports:[UsersService]
})
export class UsersModule {}
