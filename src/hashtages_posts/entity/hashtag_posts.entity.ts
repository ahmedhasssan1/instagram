import { Field, ObjectType } from "@nestjs/graphql";
import { Hashtag } from "src/hashtags/entity/hashtag.entity";
import { Posts } from "src/posts/entity/posts.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class HashTagPosts{

    @PrimaryGeneratedColumn()
    @Field()
    id:number

    @ManyToOne(()=>Hashtag,(hashtag)=>hashtag.id,{onDelete:'CASCADE'})
    @JoinColumn()
    @Field()
    hashTag:Hashtag

    @ManyToOne(()=>Posts,(post)=>post.id,{onDelete:'CASCADE'})
    @JoinColumn()
    @Field()
    post:Posts

}