import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('cars')
export class CarEntity extends BaseEntity {
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

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

    @PrimaryColumn()
    @Column({ type: 'integer' })
    driverId: number;

    @ManyToOne(() => DriverEntity, (driver) => driver.cars, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'driverId' })
    drivers: DriverEntity[];
}
