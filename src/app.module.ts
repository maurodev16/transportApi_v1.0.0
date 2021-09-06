import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './db/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { AuthEntity } from './db/entities/auth.entity';
import { DriversController } from './modules/drivers/drivers.controller';
import { DriversModule } from './modules/drivers/drivers.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { StatusService } from './modules/status/status.service';
import { StatusController } from './modules/status/status.controller';
import { StatusModule } from './modules/status/status.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { CarsController } from './modules/cars/cars.controller';
import { CarsService } from './modules/cars/cars.service';
import { RatingsService } from './modules/ratings/ratings.service';
import { RatingsController } from './modules/ratings/ratings.controller';

const entities = [AuthEntity];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    CarsModule,
    DriversModule,
    RatingsModule,
    StatusModule,
    UsersModule,
  ],
  controllers: [AppController, StatusController, UsersController, CarsController, RatingsController],
  providers: [AppService, StatusService, UsersService, CarsService, RatingsService],
})
export class AppModule { }
