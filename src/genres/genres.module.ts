import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { Genre } from './genres.entity';
@Module({
 controllers: [GenresController],
 providers: [GenresService],
 imports: [
    TypeOrmModule.forFeature([Genre, Book])
],
})
export class GenresModule {}