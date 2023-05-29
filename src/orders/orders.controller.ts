import { Controller, Get, Put, Post, Delete, Param, Body, UsePipes, ValidationPipe, UseFilters} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { InternalServerExceptionFilter } from 'src/filters/internal-server-error.filters';


@ApiTags('Заказы')
@ApiBearerAuth()
@Controller('orders')
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter, InternalServerExceptionFilter)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    @Get()
    findAll(){
        return this.ordersService.findAll();
    }
      
    @Get(':id')
    findOne(@Param('id') id: string) {
        const order = this.ordersService.findOne(+id);
        return order;
    }
   
    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateOrder: CreateOrderDto) {
        return this.ordersService.update(+id, updateOrder);
    }
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createOrder: CreateOrderDto) {
        return this.ordersService.create(createOrder);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
       return this.ordersService.remove(+id);
     }
}