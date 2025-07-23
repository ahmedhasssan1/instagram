import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { file, number } from 'zod';

@InputType()
export class Hashtag_postDto {
  @Field()
  @IsNumber()
  hashtag_id: number;

  @Field()
  @IsNumber()
  post_id: number;
}
