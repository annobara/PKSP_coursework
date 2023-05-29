import { Book } from "src/books/books.entity";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity('storage')
export class Storage{
    @PrimaryGeneratedColumn()
    cell_id: number;
    @OneToOne(() => Book)
    @JoinColumn()
    book: Book
    @Column()
    amount: number;
    @UpdateDateColumn()
    delivery_date: Date   
}