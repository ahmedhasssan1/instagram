import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { file } from "zod";

@Entity()
@ObjectType()
export class Followers{
    @Field()
    @PrimaryGeneratedColumn()
    id:number

    @Field()
    @Column()
    leader_id:number

    @Field()
    @Column()
    follower_id:number

}