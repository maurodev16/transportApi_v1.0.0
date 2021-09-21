import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CarsModule } from './modules/cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { DriversModule } from './modules/drivers/drivers.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { RatingsController } from './modules/ratings/ratings.controller';
import * as options from './db/config/ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { debug } from 'console';
import { DriversController } from './modules/drivers/drivers.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot(
      options
    ),
    AuthModule,
    UsersModule,
    CarsModule,
    DriversModule,
    RatingsModule,
  ],
  controllers: [AppController, UsersController, DriversController, RatingsController],

})
export class AppModule { }
