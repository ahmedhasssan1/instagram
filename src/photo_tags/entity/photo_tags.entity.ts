import { Field, ObjectType } from '@nestjs/graphql';
import { Posts } from 'src/posts/entity/posts.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { file, number } from 'zod';

@ObjectType()
@Entity()
export class PhotoTags {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  update_at: Date;

  @ManyToOne(type => Posts, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({name:'post_id'})
  @Field(() => Posts)
  post: Posts;

  @ManyToOne(type => Users, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({name:'user_id'})
  @Field(() => Users)
  user: Users;

  @Column()
  @Field()
  x: number;

  @Column()
  @Field()
  y: number;
}
