import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Driver, Repository } from 'typeorm';


@Injectable()
export class DriverService {
    constructor(@InjectRepository(DriverEntity) private driverRepository: Repository<DriverEntity>) { }

    async registerDriver(driverData: Partial<DriverEntity>): Promise<Partial<DriverEntity>> {
        try {
            driverData.password = await EncryptUtil.hashPassword(driverData.password);
            const newDriver = await this.driverRepository.save(driverData);
            if (newDriver) {
                const { password, ...driver } = newDriver;
                return driver;
            }

        } catch (error) {
            throw error;
        }
    }

    async findDriverByEmail(email: string): Promise<DriverEntity> {
        const driver = await this.driverRepository.findOne({ where: { email } });
        if (driver) {
            return driver;
        } else {
            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
        }
    }


    async getDriverById(id: number) {
        const driver = await this.driverRepository.findOne({ id });
        if (driver) {
            return driver;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

}
