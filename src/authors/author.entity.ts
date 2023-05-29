import { Book } from "src/books/books.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm"

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    author_id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    birthyear: number;
    @Column()
    country: string;
    @OneToMany((type) => Book, (book) => book.author)
    books: Book[]
}