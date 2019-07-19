import {
    Module,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserResolver } from './user.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [UserService, UserResolver, JwtStrategy],
    exports: [UserService, UserResolver],
})
export class UserModule { }
