import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'ajhbegvvlbg0987248oezqyaf28g64cxayuftzg',
            },
        );
    }

    async validate(payload: JwtPayload, done: Function) {
        const user = await this.userService.validateUser(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
