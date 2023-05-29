import { GenresService } from './genres.service';
import { Genre } from './genres.entity';
import { Controller, Get, Put, Post, Delete, Param, Body, UseFilters, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { InternalServerExceptionFilter } from 'src/filters/internal-server-error.filters';
import { CreateGenreDto } from './dto/genre.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@ApiTags('Жанры')
@ApiBearerAuth()
@Controller('genres')
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter, InternalServerExceptionFilter)
export class GenresController {
    constructor(private readonly genresService: GenresService) {}
    @Get()
    findAll() {
       return this.genresService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.genresService.findOne(+id);
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateGenre: CreateGenreDto) {
        return this.genresService.update(+id, updateGenre);
    }

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() createGenre: CreateGenreDto) {
        return this.genresService.create(createGenre);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
       return this.genresService.remove(+id);
     }
}