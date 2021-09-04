import { 
    BaseEntity,  
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    Timestamp, 
} from "typeorm";

@Entity('auth')
export class AuthEntity extends BaseEntity {
    // ContentEntity ja adiciona o Id, CreateAt e UdateAt
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    firstname: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    lastname: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    phone: string;

    @Column({ type: "varchar", nullable: true, length: 30, unique: true })
    cel: string;

    @Column({ type: 'varchar', length: 150, nullable: true, unique: true })
    email: string;

    
    @Column({ name: 'password', type: 'varchar', length: 60, nullable: true })
    password: string;

    @Column({ length: 5, nullable: true })
    postCode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    ort: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    city: string;

    @Column({type:'timestamp', default: () => "now()"})
    createdAt: string;

    @Column({type:'timestamp'})
    updatedAt: string;

}
