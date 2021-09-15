import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')
export class TokenEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({type: 'varchar', length: 255, nullable: false })
    token: string;

    @Column({type: 'varchar', length: 150, nullable: false, unique: true })
    email: string;
}
