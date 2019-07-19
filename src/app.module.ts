import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'test',
      // entities: ['./**/*.entity{.ts,.js}'],
      entities: [User],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
