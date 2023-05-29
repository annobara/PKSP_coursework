import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module'
import { BooksModule } from './books/books.module'
import { GenresModule } from './genres/genres.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    AuthorsModule, 
    BooksModule, 
    GenresModule, 
    StorageModule,
    UsersModule,
    OrdersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'education',
      password: 'password',
      host: 'localhost',
      synchronize: false,
      logging: 'all',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard],

})
export class AppModule {}
