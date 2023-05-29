import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
    UseGuards
   } from '@nestjs/common'
   import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'
   import { User } from 'src/users/users.entity'
   import { AuthService } from './auth.service'
   import { JwtAuthGuard } from './auth.guard'


   @ApiBearerAuth()
   @ApiTags('Аутентификация')
   @Controller('auth')
   export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() user: User) {
        const result = await this.authService.login(user);
        if (result == null) {
            return new UnauthorizedException('Username or password is incorrect');
        }
        return result;
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    
    async profile(){
        return 'Authorized'
    } 
}
   