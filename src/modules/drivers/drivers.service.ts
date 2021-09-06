import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {
    constructor(
        @InjectRepository(DriverEntity)
        private driverRepository: Repository<DriverEntity>,

    ) { }
    async registerDriver(createDriver: DriverEntity): Promise<DriverEntity> {
        const newDriver = await this.driverRepository.create(createDriver);
        await newDriver.save();
        return newDriver;
    }
}
