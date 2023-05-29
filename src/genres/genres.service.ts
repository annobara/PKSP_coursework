import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genres/genres.entity';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/genre.dto';


@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async create(createGenre: CreateGenreDto): Promise<Genre> {
       const genre = this.genreRepository.create();
       genre.name = createGenre.name;
       await this.genreRepository.save(genre);
       return genre;
    }

    findOne(id: number): Promise<Genre> {
        return this.genreRepository.findOne({
            where: {genre_id: id}
        })
    }

    findAll(): Promise<Genre[]> {
         return this.genreRepository.find()
    }

    async update(id: number, updatedGenre: CreateGenreDto) {
        const genre = await this.genreRepository.findOne({where: {genre_id: id}});
        if (genre == null){
            throw new NotFoundException(`genre with id ${id} is not found`)
        }
        genre.name = updatedGenre.name;
        await this.genreRepository.save(genre);
        return genre;
    }

    remove(id: number) {
        this.genreRepository.delete({genre_id: id});
     }              
        
}