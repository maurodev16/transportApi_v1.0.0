
import { BaseEntity, Column,  CreateDateColumn,  Double, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CarEntity } from "./car.entity";

@Entity('drivers')
export class DriverEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public firstname: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    public lastname: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    public phone: string;

    @Column({ type: "varchar", nullable: true, length: 30, unique: true })
    public cel: string;

    @Column({ type: 'varchar', length: 150, nullable: true, unique: true })
    public email: string;

    @Column({ name: 'password', type: 'varchar', length: 60, nullable: true })
    public password: string;

    @Column({ length: 5, nullable: true })
    public postCode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public ort: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public city: string;

    @Column({ type: 'varchar', length: 20 })
    public hauseNumber: string;

    @Column({ type: 'varchar', length: 20 })
    public language: string;

    @Column({ type: 'decimal' })
    public startPrice: Double;

    @Column({ type: 'integer' })
    public trips: number;

    @Column({ type: 'boolean', default: false })
    public doHelp: Boolean;

    @Column({ type: 'boolean', default: false })
    public isOnline: Boolean;

    @Column({type:'boolean', default: false})
    public status: Boolean;

    @Column({ type: "varchar" })
    public driverAvatarUrl: string;

    @Column({ type: 'varchar' })
    public carImgUrl1: string;

    @Column({ type: 'varchar' })
    public carImgUrl2: string;

    @Column({ type: 'varchar' })
    public carImgUrl3: string;

    @Column({ type: 'varchar' })
    public carImgUrl4: string;

    @Column({ type: 'varchar' })
    public carImgUrl5: string;

    @Column({ type: 'varchar' })
    public docUrl1: string;

    @Column({ type: 'varchar' })
    public docUrl2: string;

    @Column({ type: 'varchar' })
    public docUrl3: string;

    @Column({ type: 'varchar' })
    public docUrl4: string;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

    @PrimaryColumn()
    @Column({ type: 'integer' })
    public carId: number;

    @OneToMany(() => CarEntity, (car) => car.drivers)
    @JoinColumn({ name: 'carId' })
    cars: CarEntity[];
   
}
