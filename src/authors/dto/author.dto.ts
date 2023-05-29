import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateAuthorDto{
    @ApiProperty({example: 'Лев', description: 'имя автора'})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example: 'Толстой', description: 'фамилия автора'})
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({example: '1828', description: 'год рождения автора'})
    @IsPositive()
    @IsInt()
    birthyear: number;

    @ApiProperty({example: 'Россия', description: 'страна автора'})
    @IsNotEmpty()
    @IsString()
    country: string;
}