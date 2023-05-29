import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.module';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'secret',
        });
    }
    async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
    }
}