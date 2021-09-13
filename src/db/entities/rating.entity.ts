import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('rating')
export class RatingEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'integer'})
    rating: number;

    @PrimaryColumn()
    @Column({type:'integer'})
    userId:number;

    @ManyToMany(()=> UserEntity, user => user.ratings)
    @JoinColumn({name:'userId'})
    users:UserEntity[]
}