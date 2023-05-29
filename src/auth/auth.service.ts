import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/users.entity'
import { UsersService } from 'src/users/users.service'
import { JwtPayload } from './auth.module'


@Injectable()
export class AuthService
{
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async validateUser(payload: JwtPayload): Promise<User> {
        return this.usersService.findOneUser(payload.name);
    }
    async login(userDto: User){
        const payload: JwtPayload = { name: userDto.name };
        const user = await this.usersService.login(userDto);
        if (!user) return null;
        return {
            access_token: this.jwtService.sign(payload),
        };
    } 
}
