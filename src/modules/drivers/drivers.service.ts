import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { EncryptUtil } from 'src/shared/utils/encrypt.util';
import { Driver, Repository } from 'typeorm';


@Injectable()
export class DriverService {
    constructor(@InjectRepository(DriverEntity) private driverRepository: Repository<DriverEntity>) { }

    async registerDriver(driverData: Partial<DriverEntity>): 
    Promise<Partial<DriverEntity>> {
        driverData.password = await EncryptUtil.hashPassword(driverData.password);
          const newDriver=await  this.driverRepository.save(driverData);
            const { password, ...driver } = newDriver;
            return driver;
    }

   async addDriverInfo(driverData:Partial<DriverEntity>):Promise<DriverEntity>{
        return this.driverRepository.save(driverData);
    }

    async findDriverByEmail(email: string): Promise<DriverEntity> {
        return await this.driverRepository.findOne({
            where: {
                email
            }
        })
    }

    async showById(id: number): Promise<DriverEntity> {
        const driver = await this.findById(id);
        delete driver.password;
        return driver;
    }

    async findById(id: number) {
        return await DriverEntity.findOne(id);
    }



}
