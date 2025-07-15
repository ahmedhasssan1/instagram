import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/users/entity/users.entity'; 

@ObjectType()
@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  updated_at: Date;

  @Field(()=>Users)
  @ManyToOne(() => Users, (user) =>user.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ length: 250 })
  @Field(() => String)
  caption: string;

  @Column('real')
  @Field(() => Float)
  iat: number;

  @Column('real')
  @Field(() => Float)
  lng: number;

  @Column({default:0})
  @Field(()=>Int)
  likescount:number

  @Column({default:0})
  @Field(()=>Int)
  commentCount:number

}
