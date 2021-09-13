import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { DriversController } from './drivers.controller';
import { DriverService } from './drivers.service';

@Module({
    imports:[TypeOrmModule.forFeature([DriverEntity])],
    controllers:[DriversController],
    providers:[DriverService]
})
export class DriversModule {}
