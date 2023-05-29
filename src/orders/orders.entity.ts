import { Book } from "src/books/books.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    order_id: number;

    @ManyToOne((type)=> Book, (book) => book.orders)
    book: Book

    @Column()
    amount: number

    @ManyToOne((type) => User, (user) => user.orders)
    user: User 
}