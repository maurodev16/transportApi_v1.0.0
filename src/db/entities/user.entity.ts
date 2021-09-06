import { BaseEntity, Column, Double, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";
import { RatingEntity } from "./rating.entity";
import { StatusEntity } from "./status.entity";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'integer', nullable: true })
    floor: number;

    @Column({ type: 'varchar'})
    pickUp: string;

    @Column({ type: "varchar"})
    dropOff: string;

    @Column({type: "datetime", nullable: true })
    scheduling: Date;

    @Column({type:'timestamp'})
    createdAt: Date;

    @Column({type:'timestamp'})
    updatedAt: Date;

    @ManyToOne(()=>StatusEntity, (statusEntity)=> statusEntity.users)
    status:StatusEntity[];

    @ManyToMany(()=>RatingEntity, (ratingEntity)=> ratingEntity.users)
    ratings:RatingEntity[];

}
