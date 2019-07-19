import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constants } from '../constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    createToken(payload: JwtPayload): any {
        const secretOrKey = constants.secret;
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

        password = await bcrypt.hash(password, 10);
        return await this.userRepository.save(new User(name, password));
    }

    async login(name: string, password: string): Promise<User> {
        if (password == "") {
            throw new HttpException('empty password', HttpStatus.BAD_REQUEST);
        }
        var user = await this.userRepository.findOne({ where: { name: name } });
        if (user == null) return user;
        var isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            return user;
        }
        return null;
    }
}
