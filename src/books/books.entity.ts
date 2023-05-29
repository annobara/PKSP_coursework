import { Genre } from "src/genres/genres.entity";
import { Author } from "src/authors/author.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/orders.entity";


@Entity("book")
export class Book {
    @ApiProperty({example: '1', description: 'уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    book_id: number;

    @ApiProperty({example: 'Анна Каренина', description: 'название книги'})
    @Column()
    title: string;

    @ApiProperty({example: '2015', description: 'год издания'})
    @Column()
    year: number;

    @ApiProperty({example: '499', description: 'цена'})
    @Column()
    price: number;

    @ManyToMany((type) => Genre, (genre) => genre.books)
    @JoinTable({
        name: 'book_genre',
        joinColumn: { name: 'book_id'},
        inverseJoinColumn: { name: 'genre_id'}
    })
    genres: Genre[]
    
    @ManyToOne((type) => Author, (author) => author.books)
    author: Author

    @OneToMany((type) => Order, (order) => order.book)
    orders: Order[]

}