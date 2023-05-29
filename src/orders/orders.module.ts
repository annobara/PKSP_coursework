import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { User } from 'src/users/users.entity';
import { Book } from 'src/books/books.entity';

@Module({
 controllers: [OrdersController],
 providers: [OrdersService],
 imports: [
    TypeOrmModule.forFeature([Order, Book, User]),
    ],
})
export class OrdersModule {}