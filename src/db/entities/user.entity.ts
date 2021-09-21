import { IsEmail, IsMobilePhone, IsPhoneNumber, IsPostalCode } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany,  PrimaryGeneratedColumn,  UpdateDateColumn } from "typeorm";
import { RatingEntity } from "./rating.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public firstname: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    public lastname: string;

    @IsPhoneNumber('DE')
    @Column({ type: "varchar", unique: true, nullable: true })
    public phone: string;

    @IsMobilePhone('de-DE')
    @Column({ type: "varchar", nullable: true, length: 30, unique: true })
    public cel: string;

    @IsEmail()
    @Column({ type: 'varchar', nullable: false, unique: true })
    public email: string;

    @Column({ name: 'password', type: 'varchar', length: 60, nullable: false })
    public password: string;
 
    @Column({ default: false })
    public isEmailConfirmed: boolean;
    
    @IsPostalCode('DE')
    @Column({ type: 'varchar', length: 5, nullable: true })
    public postCode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public ort: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public city: string;

    @Column({type:'boolean'})
    public isActive: Boolean;

    @Column({type:'boolean'})
    public isVerified: Boolean;

    @Column({ type: 'boolean', default: false })
    public status: Boolean;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

    @ManyToMany(() => RatingEntity, (ratingEntity) => ratingEntity.users)
    public ratings: RatingEntity[];

}
