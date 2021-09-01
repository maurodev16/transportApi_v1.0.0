import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { DriverEntity } from "./DriverEntity";

@Entity('cars')
export class CarEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false })
    carName: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    carBrand: string;

    @Column({ type: "varchar", nullable: true })
    carImage: string;

    @Column({  type: "varchar", nullable: false })
    licensePlate: string;

    @Column({ type: "timestamp" })
    createAt: Timestamp;

    @Column({ type: "timestamp" })
    updateAt: Timestamp;

    @Column({ name: 'driver_id', type: 'integer' })
    driverId: number;

    @ManyToOne(() => DriverEntity, (driver) => driver.cars)
    @JoinColumn({ name: 'driver_id' })
    drivers: DriverEntity[];
}
