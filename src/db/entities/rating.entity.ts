import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('rating')
export class RatingEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @Column({type: 'integer'})
    public  rating: number;

    @PrimaryColumn()
    @Column({type:'integer'})
    public userId:number;

    @ManyToMany(()=> UserEntity, user => user.ratings)
    @JoinColumn({name:'userId'})
    public users:UserEntity[]
}