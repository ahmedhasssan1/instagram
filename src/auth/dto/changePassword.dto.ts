import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  userId:number

  @Field()
  @MinLength(5, { message: 'New password must be at least 5 characters' })
  newPassword: string;
}
