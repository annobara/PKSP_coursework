import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService{
    private readonly users: User[];
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.users = [{
            user_id: 1,
            name: "user",
            password: "password",
            email: "user@gmail.com"
        }]
    }
    
    async create(createUser: CreateUserDto): Promise<User> {
       const user = this.userRepository.create();
       user.name = createUser.name;
       user.password = createUser.password;
       user.email = createUser.email;
       user.age = createUser.age;
       await this.userRepository.save(user);
       return user;
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: {user_id: id}
        })
    }

    findAll(): Promise<User[]> {
         return this.userRepository.find() 
    }

    async update(id: number, updatedUser: CreateUserDto) { 
        const user = await this.userRepository.findOne({where: {user_id: id}});
        if (user == null){
            throw new NotFoundException(`user with id ${id} is not found`)
        }
        user.name = updatedUser.name;
        user.password = updatedUser.password;
        user.email = updatedUser.email;
        user.age = updatedUser.age;
        await this.userRepository.save(user);
        return user;
    }

    remove(id: number) {
        this.userRepository.delete({user_id: id});
    }              

     async findOneUser(name: string): Promise<User | undefined> {
        return this.users.find((user) => user.name === name);    
    }

    async login(userDto: User): Promise<any | { status: number }> {
        const user = await this.findOneUser(userDto.name);
        if (!user) {
            return Promise.resolve(null);
        }
        if (user.password !== userDto.password) {
            throw new Error('Invalid credentials');
        }
        return user;
    }
}
