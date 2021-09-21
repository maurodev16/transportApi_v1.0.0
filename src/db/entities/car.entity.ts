import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('car')
export class CarEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({type: 'varchar', length: 100, nullable: false })
    public carName: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public  carBrand: string;

    @Column({  type: "varchar", nullable: false })
    public  licensePlate: string;

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
    public docUrl: string;

    @CreateDateColumn()
    public createdAt;

    @UpdateDateColumn()
    public updatedAt;

    @OneToMany(() => DriverEntity, (driver: DriverEntity) => driver.cars)
    public drivers: DriverEntity[];
}
