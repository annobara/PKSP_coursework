import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'Александр', description: 'имя пользователя'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'qwerty1234', description: 'пароль'})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: 'alexander@mail.ru', description: 'email пользователя'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '19', description: 'возраст пользователя'})
    @IsOptional()
    @IsInt()
    @Min(1)
    age?: number;
}