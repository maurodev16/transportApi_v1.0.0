import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/db/entities/driver.entity';
import { AuthModule } from '../auth/auth.module';
import { DriversController } from './drivers.controller';
import { DriverService } from './drivers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DriverEntity]),
        
        PassportModule,
       
    ],
    controllers: [DriversController],
    providers: [DriverService],
    exports: [DriverService]
})
export class DriversModule { }
