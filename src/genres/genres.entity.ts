import { Book } from "src/books/books.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm"


@Entity('genre')
export class Genre{
    @PrimaryGeneratedColumn({})
    genre_id: number;
    @Column()
    name: string;
    @ManyToMany((type) => Book, (book) => book.genres)
    @JoinTable({
        name: 'book_genre',
        joinColumn: { name: 'genre_id'},
        inverseJoinColumn: { name: 'book_id'}
    })
    books: Book[]

}