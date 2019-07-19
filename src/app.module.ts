import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';


@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/../data/db.sqlite',
      entities: [User],
      synchronize: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
