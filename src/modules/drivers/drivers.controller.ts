import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { DriversService } from './drivers.service';

@Controller('driver')
export class DriversController {
    constructor(private driverService: DriversService) { }
    @Post('register')
    async registerDriver(
        @Body() createDriver: DriverEntity,
    ): Promise<DriverEntity> {
        const newDriver = await this.driverService.registerDriver(createDriver);
        return newDriver;
    }


}
