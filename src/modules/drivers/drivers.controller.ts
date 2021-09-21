import { Body, Controller, Get, Req, Post, UseGuards, HttpCode } from '@nestjs/common';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { LocalAuthenticationGuardDriver } from '../auth/localAuth.guard';
import { DriverService } from './drivers.service';

@Controller('driver')
export class DriversController {
    constructor(private driverService: DriverService) { }

    @Get('drivers')
    async getAllDrivers():Promise<DriverEntity[]>{
        return this.driverService.getAllDrives();
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuardDriver)
    @Post('login-driver')
    async loginDriver(@Req() request){
      const driver = request.user;
      
      return driver;
    }
  
}
