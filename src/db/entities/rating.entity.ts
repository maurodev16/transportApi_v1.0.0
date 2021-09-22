import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('rating')
export class RatingEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @Column({type: 'integer'})
    public  rating: number;

    @PrimaryColumn()
    @Column({type:'integer'})
    public userId:number;

}