import { InputType, Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, MaxLength, IsInt } from 'class-validator';
import { Posts } from '../entity/posts.entity';

@InputType()
export class CreatePostDto {
  @Field(() => Int)
  @IsInt()
  user: number;

  @Field({nullable:true})
  @IsString()
  @MaxLength(250)
  caption: string;

  @Field(() => Float)
  @IsNumber()
  iat: number;

  @Field(() => Float)
  @IsNumber()
  lng: number;
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Posts])
  items: Posts[];

  @Field(() => Int)
  totalCount: number;
}