import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class DeleteCommentDto {
  @Field(() => Int)
  @IsInt()
  post_id: number;

  @Field(() => Int)
  @IsInt()
  comment_id: number;

  @Field(() => Int)
  @IsInt()
  user_id: number;
}
