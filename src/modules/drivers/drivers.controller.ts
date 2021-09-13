import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { getRepository } from 'typeorm';
import { DriverService } from './drivers.service';

@Controller('driver')
export class DriversController {
    constructor(private driverService: DriverService) { }
    @Post('register')
    async registerDriver(
        @Body() createDriver: Partial<DriverEntity>):
        Promise<Partial<DriverEntity>> {
        const newDriver = await this.driverService.registerDriver(createDriver);
        return newDriver;
    }

    @Post('add-new-driver-info')
    async addNewDriverInfo(@Body() driverData: Partial<DriverEntity>): Promise<DriverEntity> {
        const newDriverInfo = await this.driverService.addDriverInfo(driverData);
        return newDriverInfo;
    }
}
