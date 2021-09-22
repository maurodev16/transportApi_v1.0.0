import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,  PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('vehicle')
export class VehicleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({type: 'varchar', length: 100, nullable: false })
    public vehicleName: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public  vehicleBrand: string;

    @Column({  type: "varchar", nullable: false })
    public  licensePlate: string;

    @Column({ type: 'varchar' })
    public vehicleImgUrl1: string;

    @Column({ type: 'varchar' })
    public vehicleImgUrl2: string;

    @Column({ type: 'varchar' })
    public vehicleImgUrl3: string;

    @Column({ type: 'varchar' })
    public vehicleImgUrl4: string;

    @Column({ type: 'varchar' })
    public vehicleImgUrl5: string;
    
    @Column({ type: 'varchar' })
    public docUrl: string;

    @CreateDateColumn()
    public createdAt;

    @UpdateDateColumn()
    public updatedAt;


    @OneToMany(() => UserEntity, (user: UserEntity) => user.vehicles)
    @JoinColumn({name:"user_id"})
    public user: UserEntity[];

}
