
import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "./AuthEntity";
import { CarEntity } from "./CarEntity";

@Entity('drivers')
export class DriverEntity  {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'driver_Id', type: "integer"})
    driverId: number;

    @Column({type: 'varchar', length: 20 })
    hauseNumber: string;

    @Column({type: 'varchar', length: 20 })
    language: string;

    @Column({ type: 'double', nullable: false })
    startPrice: Double;

    @Column({ type: 'number',})
    trips: number;
    
    @Column({ type: 'double' })
    ratings: Double;

    @Column({ type: 'boolean', default: false })
    doHelp: Boolean;

    @Column({ type: "varchar" })
    driverAvatarUrl: string;

    @Column({ type: 'varchar' })
    carImgUrl1: string;

    @Column({ type: 'varchar' })
    carImgUrl2: string;

    @Column({type: 'varchar' })
    carImgUrl3: string;

    @Column({type: 'varchar' })
    carImgUrl4: string;

    @Column({type: 'varchar' })
    carImgUrl5: string;

    @Column({ type: 'varchar' })
    docUrl1: string;

    @Column({ type: 'varchar' })
    docUrl2: string;

    @Column({type: 'varchar' })
    docUrl3: string;

    @Column({type: 'varchar' })
    docUrl4: string;

    @OneToMany(() => CarEntity, (car) => car.drivers)
    cars: CarEntity[];
}
