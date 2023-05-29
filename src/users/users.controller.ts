import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/user.dto";
import { NotFoundExceptionFilter } from "src/filters/not-found-exception.filter";
import { BadRequestExceptionFilter } from "src/filters/bad-request-exception.filter";
import { InternalServerExceptionFilter } from "src/filters/internal-server-error.filters";
import { JwtAuthGuard } from "src/auth/auth.guard";


@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('users')
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter, InternalServerExceptionFilter)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
       return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
        return this.usersService.update(+id, updateUser);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    create(@Body() createUser: CreateUserDto) {
        return this.usersService.create(createUser);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
       return this.usersService.remove(+id);
     }
}