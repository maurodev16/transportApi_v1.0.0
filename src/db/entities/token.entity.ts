import { IsEmail, IsJWT } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('token')
export class TokenEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsJWT()
    @Column({type: 'varchar', length: 255, nullable: false })
    public token: string;

    @IsEmail()
    @Column({type: 'varchar', length: 150, nullable: false, unique: true })
   public email: string;
}
