import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber, MaxLength, IsInt } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field(() => Int)
  @IsInt()
  user: number;

  @Field()
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
