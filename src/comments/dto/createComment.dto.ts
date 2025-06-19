import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsInt()
  postId: number;
}
