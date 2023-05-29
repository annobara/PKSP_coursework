import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class CreateOrderDto{
    @ApiProperty({example: '1', description: 'уникальный идентификатор книги'})
    @IsNumber()
    @Min(1)
    book: number;

    @ApiProperty({example: '2', description: 'количество книг в заказе'})
    @IsNumber()
    @Min(1)
    amount: number;

    @ApiProperty({example: '1', description: 'уникальный идентификатор пользователя'})
    @IsNumber()
    @Min(1)
    user: number;

}