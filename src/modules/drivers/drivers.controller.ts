import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { DriverService } from './drivers.service';

@Controller('driver')
export class DriversController {
    constructor(private driverService: DriverService) { }

    @Post('register')
    async registerDriver(
        @Body() createDriver: Partial<DriverEntity>):
        Promise<Partial<DriverEntity>> {
        const newDriver = await this.driverService.registerDriver(createDriver);
        if (!newDriver) {
            throw new NotFoundException('Driver not found:::::');
        } else { return newDriver; }

    }

}
