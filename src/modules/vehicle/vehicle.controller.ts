import {  Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehicleEntity } from 'src/db/entities/vehicle.entity';
import {  VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }
    @Get(':id')
    async getAllVehicleByDriverId(@Param('id', ParseIntPipe) driverId: number): Promise<VehicleEntity[]> {
        const vehicle = await this.vehicleService.getAllVehicleByDriverId(driverId);
        return vehicle;
    }
}
