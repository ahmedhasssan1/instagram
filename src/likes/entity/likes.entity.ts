// likes.entity.ts
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({ nullable: true })
  post_id?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  comment_id?: number;
}
