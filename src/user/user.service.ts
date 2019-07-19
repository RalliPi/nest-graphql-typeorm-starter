import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    private readonly secret: string = 'ajhbegvvlbg0987248oezqyaf28g64cxayuftzg';

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    createToken(payload: JwtPayload): any {
        const secretOrKey = 'ajhbegvvlbg0987248oezqyaf28g64cxayuftzg';
        const token = jwt.sign(payload, secretOrKey);
        return token;
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        return await this.getUserById(payload.id);
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async register(name: string, password: string): Promise<User> {
        var duplicate = await this.userRepository.findOne({ where: { name: name } });
        if (duplicate != null) {
            throw new HttpException(
                'username already taken',
                HttpStatus.CONFLICT,
            );
        }
        if (password == undefined)
            password = "";
        return await this.userRepository.save(new User(name, password));
    }

    async login(name: string, password: string): Promise<User> {
        if (password == "") {
            throw new HttpException('empty password', HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.findOne({ where: { name: name, password: password } });
    }
}
