import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/db/entities/car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarsController],
  providers: [CarsService],
  exports:[CarsService]
})
export class CarsModule { }
