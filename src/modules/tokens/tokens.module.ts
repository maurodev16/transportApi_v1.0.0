import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TokenEntity } from 'src/db/entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UserModule,
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  providers: [ TokensService],
  controllers: [TokensController],
  exports:[TokensService]
})
export class TokensModule {}
