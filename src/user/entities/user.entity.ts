import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql';

interface IUser {
    id: number;
    name: string;
    password: string;
}

@ObjectType()
@Entity()
export class User {

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ length: 50 })
    @Field()
    name: string;

    @Column({ length: 500 })
    @Field()
    password: string;
}