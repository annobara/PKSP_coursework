import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from 'src/books/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { User } from 'src/users/users.entity';
import { CreateOrderDto } from './dto/order.dto';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}
  
    async create(orderDto: CreateOrderDto): Promise<Order>{
        const order = this.orderRepository.create()
        order.amount = orderDto.amount;
        order.user = await this.userRepository.findOneBy({
            user_id: orderDto.user
        });
        if (order.user == null){
            throw new NotFoundException(`user with id ${orderDto.user} is not found`)
        }
        order.book = await this.bookRepository.findOneBy({
            book_id: orderDto.book
        });
        if (order.book == null){
            throw new NotFoundException(`book with id ${orderDto.book} is not found`)
        }
        await this.orderRepository.save(order);
        return order;

    }
    findOne(id: number): Promise<Order> {
        const order = this.orderRepository.findOne({
            where: {order_id: id },
            relations: {user: true, book: true}
        });
        return order
    }
    async findAll(): Promise<Order[]> {
         const orders = await this.orderRepository.find({
            relations: {user: true, book: true}
         });
         return orders
    }

    async update(id: number, updatedOrder: CreateOrderDto) {
        const order = await this.orderRepository.findOne({
            where: { order_id: id}
        });
        if (order==null){
            throw new NotFoundException(`book with id ${id} is not found`)
        }
        order.amount = updatedOrder.amount;
        order.user = await this.userRepository.findOneBy({
            user_id: updatedOrder.user
        });
        if (order.user == null){
            throw new NotFoundException(`user with id ${updatedOrder.user} is not found`)
        }
        order.book = await this.bookRepository.findOneBy({
            book_id: updatedOrder.book
        });
        if (order.book == null){
            throw new NotFoundException(`book with id ${updatedOrder.book} is not found`)
        }
        await this.orderRepository.save(order);
        return order;
    }
   
    remove(id: number) {
       this.orderRepository.delete({order_id: id});
     }  
} 