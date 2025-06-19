import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  recipient: string;

  @Field()
  message: string;
}