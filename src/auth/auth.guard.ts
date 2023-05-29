import { Injectable, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private readonly jwtService: JwtService){
        super();
    }
    canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest<Request>();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')){
            return false
        }
        const token: string = authHeader.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token, {secret: 'secret'});
            req.user = payload;
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    } 
}