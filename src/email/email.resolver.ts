import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService,
    @InjectQueue('main-queue') private readonly mainQueue:Queue
  ) {}

  @Mutation(()=>String)
  async sendEmail(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('otp') otp: string,
  ) {
    // Queue job data
    await this.mainQueue.add('email-queue', { email, name, otp });

    return 'Email job queued successfully';
  }
}
