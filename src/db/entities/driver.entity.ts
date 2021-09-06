
import { BaseEntity, Column, Double, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "./auth.entity";
import { CarEntity } from "./car.entity";

@Entity('drivers')
export class DriverEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'driver_Id', type: "integer"})
    driverId: number;

    @Column({type: 'varchar', length: 20 })
    hauseNumber: string;

    @Column({type: 'varchar', length: 20 })
    language: string;

    @Column({ type: 'double'})
    startPrice: Double;

    @Column({ type: 'integer'})
    trips: number;

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
    @Column({type:'timestamp'})
    createdAt: Date;

    @Column({type:'timestamp'})
    updatedAt: Date;

    @PrimaryColumn()
    @Column({ type: 'integer' })
    carId: number;

    @OneToMany(() => CarEntity, (car) => car.drivers)
    @JoinColumn({name:'carId'})
    cars: CarEntity[];
}
