import { Field, ObjectType } from "@nestjs/graphql";
import { Posts } from "src/posts/entity/posts.entity";
import { Users } from "src/users/entity/users.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { file } from "zod";

@ObjectType()
@Entity()
export class CaptionTags{
    @Field()
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({type:'timestamp'})
    @Field()
    created_at:Date

    @Field()
    @ManyToOne(()=>Users,(user)=>user.id,{onDelete:'CASCADE'})
    user:Users

    @Field()
    @ManyToOne(()=>Posts,(post)=>post.id,{onDelete:'CASCADE'})
    post:Posts
}