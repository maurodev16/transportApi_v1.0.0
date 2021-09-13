import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";
import { RatingEntity } from "./rating.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
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

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
    public email: string;

    @Column({ name: 'password', type: 'varchar', length: 60, nullable: true })
    public password: string;

    @Column({ length: 5, nullable: true })
    public postCode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public ort: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public city: string;

    @Column({ type: 'integer', nullable: true })
    public floor: number;

    @Column({ type: 'varchar' })
    public pickUp: string;

    @Column({ type: "varchar" })
    public dropOff: string;

    @Column({type:'boolean'})
    public isActive: Boolean;

    @Column({ type: "timestamp", nullable: true })
    public scheduling: Date;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

    @PrimaryColumn()
    @Column({ type: 'integer' })
    public statusId: number;

    @ManyToMany(() => RatingEntity, (ratingEntity) => ratingEntity.users)
    public ratings: RatingEntity[];

}
