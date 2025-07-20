// likes.entity.ts
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Comments } from "src/comments/entity/comments.entity";
import { Posts } from "src/posts/entity/posts.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column()
  user_id: number;

  @Field(() => Int, { nullable: true })
  @ManyToOne(()=>Posts,(post)=>post.id,{nullable:true})
  post_id?: number;

  @Field(() => Int, { nullable: true })
  @ManyToOne(()=>Comments,(comment)=>comment.id,{ nullable: true })
  comment_id?: number;
}
