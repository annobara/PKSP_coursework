import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto{
    @ApiProperty({example: 'комедия', description: 'название жанра'})
    @IsString()
    @IsNotEmpty()
    name: string;
}