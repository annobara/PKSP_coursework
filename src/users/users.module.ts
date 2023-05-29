import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Order } from 'src/orders/orders.entity';

@Module({
 controllers: [UsersController],
 providers: [UsersService],
 exports: [UsersService],
 imports: [
    TypeOrmModule.forFeature([User, Order]),
    ],
})
export class UsersModule{}