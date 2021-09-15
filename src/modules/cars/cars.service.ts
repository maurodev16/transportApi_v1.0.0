import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/db/entities/car.entity';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
    constructor(@InjectRepository(CarEntity) private carsRepository: Repository<CarEntity>, ) { }

    getAllCarsByDriverId(id:number):Promise<CarEntity[]>{
        return this.carsRepository.find({
            where:{
                id
            },
        });
    }
}
