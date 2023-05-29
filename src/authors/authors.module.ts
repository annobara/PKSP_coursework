import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Book } from 'src/books/books.entity';

@Module({
 controllers: [AuthorsController],
 providers: [AuthorsService],
 imports: [
    TypeOrmModule.forFeature([Author, Book]),
],
})
export class AuthorsModule {}
