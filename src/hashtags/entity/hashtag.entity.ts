import { Field, ObjectType } from "@nestjs/graphql";
import { timestamp } from "rxjs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { file } from "zod";

@ObjectType()
@Entity()
export class Hashtag{
    @PrimaryGeneratedColumn()
    @Field()
    id:number

    @CreateDateColumn({type:'timestamp'})
    @Field()
    created_at:Date

    @Column()
    @Field()
    title:string

}
