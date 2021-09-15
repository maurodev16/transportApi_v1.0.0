import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarEntity } from 'src/db/entities/car.entity';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }
    @Get(':id')
    async getAllCarsByDriverId(@Param('id', ParseIntPipe) driverId: number): Promise<CarEntity[]> {
        const cars = await this.carsService.getAllCarsByDriverId(driverId);
        return cars;
    }
}
