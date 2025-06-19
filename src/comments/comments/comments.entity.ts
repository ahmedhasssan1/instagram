import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Posts } from 'src/posts/entity/posts.entity';

@ObjectType()
@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  updated_at: Date;

  @Column({ length: 200 })
  @Field(() => String)
  content: string;

  @ManyToOne(() => Users, (user)=>user.id)
  @Field(() => Users)
  user: Users;

  @ManyToOne(() => Posts,(post)=>post.id)
  @Field(() => Posts)
  post: Posts

  @Column({default:0})
  @Field()
  likesCount:number

}