import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from 'src/authors/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncompleteAuthorDto } from './dto/incomplete-author.dto';
import { CreateAuthorDto } from './dto/author.dto';


@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) {}
    
    async create(createAuthor: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create()
        author.firstname = createAuthor.firstname;
        author.lastname = createAuthor.lastname;
        author.birthyear = createAuthor.birthyear;
        author.country = createAuthor.country;
        await this.authorRepository.save(author);
        return author;
    }
    findOne(id: number): Promise<Author> {
       return this.authorRepository.findOne({
        where: {author_id: id}
       })
    }

    findAll(): Promise<Author[]> { 
        const authors = this.authorRepository.find();
        return authors;
    }

    async findIncomplete(): Promise<IncompleteAuthorDto[]> {
        const authors = await this.authorRepository.find();
        const incompleteAuthors: IncompleteAuthorDto[] = authors.map((author) => {
           const incompleteAuthor = new IncompleteAuthorDto();
          incompleteAuthor.id = author.author_id;
          incompleteAuthor.firstname = author.firstname;
          incompleteAuthor.lastname = author.lastname;

        return incompleteAuthor
        });
        return incompleteAuthors
    }

    async update(id: number, updatedAuthor: CreateAuthorDto) {
        const author = await this.authorRepository.findOne({ where: {author_id: id}});
        if (author == null){
            throw new NotFoundException(`author with id ${id} is not found`)
        }
        author.firstname = updatedAuthor.firstname;
        author.lastname = updatedAuthor.lastname;
        author.birthyear = updatedAuthor.birthyear;
        author.country = updatedAuthor.country;
        await this.authorRepository.save(author);
        return author;
    }

    remove(id: number) {
        this.authorRepository.delete({author_id: id});
     }
}