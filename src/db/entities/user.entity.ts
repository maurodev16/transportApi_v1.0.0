
import { IsEmail, IsMobilePhone, IsPostalCode, } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VehicleEntity } from "./vehicle.entity";


@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public firstname: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    public lastname: string;

    @IsEmail()
    @Column({ type: 'varchar', length: 150, nullable: true, unique: true })
    public email: string;

    @Column({ name: 'password', type: 'varchar', length: 60, nullable: true })
    public password: string;

    @IsMobilePhone('de-DE')
    @Column({ type: "varchar", nullable: true, length: 30, unique: true })
    public cel: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public city: string;

    @IsPostalCode('DE')
    @Column({ type: 'varchar', length: 5, nullable: true })
    public postCode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public ort: string;

    @Column({ type: 'boolean', default: false })
    public status: Boolean;

    @Column({ type: 'varchar', length: 20 })
    public hauseNumber: string;

    @Column({ type: 'varchar', length: 20 })
    public language: string;

    @Column({ type: 'decimal' })
    public startPrice: Double;

    @Column({ type: "varchar" })
    public avatarUrl: string;

    @Column({ type: 'boolean' })
    public doHelp: Boolean;

    @Column({ default: false })
    public isEmailConfirmed: boolean;

    @Column({ type: 'boolean', default: false })
    public isOnline: Boolean;

    @Column({ type: 'boolean', default: true })
    public isActive: Boolean;

    @Column({ type: 'boolean', default: false })
    public isVerified: Boolean;

    @Column({ type: 'boolean' })
    public isDriver: Boolean;

    @CreateDateColumn()
    public  createdAt;

    @UpdateDateColumn()
    public updatedAt;

    @OneToMany(() => VehicleEntity, (vehicle: VehicleEntity) => vehicle.user, { cascade: true })

    public vehicles: VehicleEntity[];

}
