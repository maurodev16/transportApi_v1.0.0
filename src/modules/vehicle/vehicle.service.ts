import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from 'src/db/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
    constructor(@InjectRepository(VehicleEntity) private vehicleRepository: Repository<VehicleEntity>, ) { }

    getAllVehicleByDriverId(id:number):Promise<VehicleEntity[]>{
        return this.vehicleRepository.find({
            where:{
                id
            },
        });
    }
}
