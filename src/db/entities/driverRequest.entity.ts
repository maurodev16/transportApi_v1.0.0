import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('driverRequest')
export class driverRequestEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'integer', nullable: true })
    public floor: number;

    @Column({ type: 'varchar' })
    public pickUp: string;

    @Column({ type: "varchar" })
    public dropOff: string;

    @Column({ type: 'timestamp', nullable: true })
    public scheduling: Date;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}