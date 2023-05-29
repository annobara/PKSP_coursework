import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "src/books/books.entity";
import { Storage } from "src/storage/storage.entity";
import { StorageService } from "./storage.service";
import { StorageController } from "./storage.controller";


@Module({
    controllers: [StorageController],
    providers: [StorageService],
    imports: [
       TypeOrmModule.forFeature([Storage, Book])
   ],
   })
   export class StorageModule {}