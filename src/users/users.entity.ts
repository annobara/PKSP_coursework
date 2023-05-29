import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @ApiProperty({example: '1', description: 'уникальный идентификатор пользователя'})
    @PrimaryGeneratedColumn()
    user_id: number;

    @ApiProperty({example: 'Александр', description: 'имя пользователя'})
    @Column()
    name: string;

    @ApiProperty({example: 'qwerty1234', description: 'пароль'})
    @Column()
    password: string;

    @ApiProperty({example: 'alexander@mail.ru', description: 'email пользователя'})
    @Column()
    email: string;

    @Column({nullable: true})
    age?: number;

    @OneToMany((type) => Order, (order) => order.user)
    orders?: Order[]

}