import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/author.entity';
import { Book } from './books.entity';
import { Genre } from 'src/genres/genres.entity';

@Module({
 controllers: [BooksController],
 providers: [BooksService],
 imports: [
    TypeOrmModule.forFeature([Author, Book, Genre]),
    ],
})
export class BooksModule {}