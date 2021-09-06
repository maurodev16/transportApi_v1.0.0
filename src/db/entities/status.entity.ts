import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('status')
export class StatusEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({default:'ACTIVE'})
    statusRequest: string;

    @PrimaryColumn()
    @Column({name:'user_Id',type:'integer'})
    userId:number;

    @OneToMany(()=> UserEntity, user => user.status)
    @JoinColumn({name:'user_Id'})
    users:UserEntity[]
}