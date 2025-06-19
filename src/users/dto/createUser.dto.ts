// src/users/dto/create-user.dto.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  bio: string;

  @Field(() => String)
  @IsString({ message: 'Number must be an string' })
  number: string;

  @Field()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @Field()
  @IsString()
  @MinLength(5, { message: 'Password must be at least 6 characters' })
  password: string;

  @Field()
  @IsString()
  status: string;
}
