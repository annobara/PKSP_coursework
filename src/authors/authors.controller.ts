import { AuthorsService } from './authors.service';
import { Request, Controller, Get, Put, Post, Delete, Param, Body, UsePipes, ValidationPipe, UseFilters, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/author.dto';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { InternalServerExceptionFilter } from 'src/filters/internal-server-error.filters';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@ApiBearerAuth()
@Controller('authors')
@ApiTags('Авторы')
@UseFilters(InternalServerExceptionFilter, NotFoundExceptionFilter, BadRequestExceptionFilter)
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
    @Get()
    findAll() {
        return this.authorsService.findAll();
    }
    @Get('incomplete')
    findIncomplete(){
       return this.authorsService.findIncomplete();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorsService.findOne(+id);
    }
    
    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateAuthor: CreateAuthorDto) {
        return this.authorsService.update(+id, updateAuthor);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createAuthor: CreateAuthorDto) {
        return this.authorsService.create(createAuthor);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
       return this.authorsService.remove(+id);
    }
}