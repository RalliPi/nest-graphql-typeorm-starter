import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UseGuards, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { GqlAuthGuard } from "./gqlauthguard";
import { Query as TQuery, Int } from 'type-graphql';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @TQuery()
    @Query()
    @UseGuards(GqlAuthGuard)
    id(): String {
        return "hello hello"
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => User, { name: 'user', nullable: true })
    async getUser(@CurrentUser() user: User, @Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
        if (user.id != id)
            throw new UnauthorizedException();
        return await this.userService.getUserById(id)
    }

    @Mutation(returns => String, { name: 'register', nullable: true })
    async register(@Args('name') name: string, @Args('password') password: string): Promise<String> {
        var user = await this.userService.register(name, password);
        if (user != null) {
            return this.userService.createToken({ id: user.id });
        }
        throw new HttpException(
            'error registering user',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );

    }

    @TQuery(returns => String, { name: 'login', nullable: true })
    @Query(returns => String, { name: 'login', nullable: true })
    async login(@Args('name') name: string, @Args('password') password: string): Promise<String> {
        var user = await this.userService.login(name, password);
        if (user != null) {
            return this.userService.createToken({ id: user.id });
        }
        throw new HttpException(
            'error logging user in',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}