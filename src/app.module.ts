import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './modules/cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { DriversModule } from './modules/drivers/drivers.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { CarsController } from './modules/cars/cars.controller';
import { CarsService } from './modules/cars/cars.service';
import { RatingsService } from './modules/ratings/ratings.service';
import { RatingsController } from './modules/ratings/ratings.controller';
import { AuthService } from './modules/auth/auth.service';
import * as options from './db/config/ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(options),
    UsersModule,
    CarsModule,
    DriversModule,
    RatingsModule,
  ],
  controllers: [AppController, UsersController, CarsController, RatingsController],
  providers: [AppService, AuthService, CarsService, RatingsService],
})
export class AppModule { }
