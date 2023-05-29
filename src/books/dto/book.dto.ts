import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";


export class CreateBookDto {
    @ApiProperty({example: 'Анна Каренина', description: 'название книги'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: '1999', description: 'год издания'})
    @IsPositive()
    @IsInt()
    year: number;

    @ApiProperty({example: '499', description: 'цена'})
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({example: '4', description: 'уникальный идентификатор автора'})
    @Min(1)
    @IsInt()
    author: number;
    
    @ApiProperty({example: [1, 2], description: 'спискок идентификаторов жанров'})
    @IsArray()
    genres: number[]; //у книги могут быть только уже созданный автор и созданные жанры
}