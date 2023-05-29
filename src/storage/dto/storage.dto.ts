import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateStorageDto {
    @ApiProperty({example: '1', description: 'уникальный идентификатор книги'})
    @Min(1)
    @IsInt()
    book: number;
    
    @ApiProperty({example: '98', description: 'количество книг на складе'})
    @Min(1)
    @IsInt()
    amount: number;
}