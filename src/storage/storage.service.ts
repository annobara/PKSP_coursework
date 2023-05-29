import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/books/books.entity";
import { Storage } from "src/storage/storage.entity";
import { Repository } from "typeorm";
import { CreateStorageDto } from "./dto/storage.dto";

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(Storage)
        private readonly storageRepository: Repository<Storage>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    async create(storageDto: CreateStorageDto): Promise<Storage>{
        const storage = this.storageRepository.create()
        storage.amount = storageDto.amount;
        const book = await this.bookRepository.findOneBy(
            {book_id: storageDto.book}
        );
        if (book == null){
            throw new NotFoundException(`book with id ${storageDto.book} is not found`)
        }
        storage.book = book;
        await this.storageRepository.save(storage)    
        return storage;
    }

    findOne(id: number): Promise<Storage>{
        return this.storageRepository.findOne({
            where: {cell_id: id},
            relations: {book: true}
        });
    }

    async findAll(): Promise<Storage[]> {
        const cells = await this.storageRepository.find({
            relations: {book: true}
        });
        return cells
   }

   async update(id: number, updatedStorage: CreateStorageDto){
        const storage = await this.storageRepository.findOneBy( 
        { cell_id: id}
    );
    if (storage == null){
        throw new NotFoundException(`cell with id ${id} is not found`)
    }
    storage.book = await this.bookRepository.findOneBy(
        {book_id: updatedStorage.book}
    );
    if (storage.book == null){
        throw new NotFoundException(`book with id ${updatedStorage.book} is not found`)
    }
    storage.amount = updatedStorage.amount;
    storage.delivery_date = new Date();
    await this.storageRepository.save(storage);
    return storage;
   }

   remove(id: number){
     this.storageRepository.delete({cell_id: id});
   }
}