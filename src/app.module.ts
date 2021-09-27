import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';
import { RatingsController } from './modules/ratings/ratings.controller';
import * as options from './db/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { UserController } from './modules/users/users.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(options),
    AuthModule,
    VehicleModule,
    RatingsModule,
    TokensModule,
  ],
  controllers: [AppController, RatingsController],
  

})
export class AppModule { }
