import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessageBirdService } from './message.service';
import { SendMessageInput } from './dto/messgae.dto';

@Resolver()
export class MessageBirdResolver {
  constructor(private readonly messageBirdService: MessageBirdService) {}

  @Mutation(() => Boolean)
  async sendTestMessage(
    @Args('input') input: SendMessageInput,
  ): Promise<boolean> {
    await this.messageBirdService.sendMessage(input);
    return true;
  }
}