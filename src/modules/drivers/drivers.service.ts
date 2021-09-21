import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Driver, Repository } from 'typeorm';


@Injectable()
export class DriverService {
    constructor(@InjectRepository(DriverEntity) private driverRepository: Repository<DriverEntity>) { }

    async createDriver(driverData: Partial<DriverEntity>): Promise<Partial<DriverEntity>> {
        const newDriver = await this.driverRepository.create(driverData);
        await this.driverRepository.save(newDriver);
        return newDriver;
    }


    async findDriverByEmail(email: string): Promise<DriverEntity> {
        const driver = await this.driverRepository.findOne({ email });
        try {
            if (driver) {
                return driver;
            }else{
                return null;
            }
        } catch (error) {
            throw new HttpException('Driver with this email does not exist', HttpStatus.NOT_FOUND);
        }
    }

    async getDriverById(id: number) {
        const driver = await this.driverRepository.findOne({ id });
        try {
            if (driver) {
                return driver;
            }else{
                return null;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    async getAllDrives():Promise<DriverEntity[]>{
        return this.driverRepository.find();
    }
}
