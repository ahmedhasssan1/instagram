import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { Sendemaildto } from './dto/sendEmail.input';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService,
    @InjectQueue('test') private readonly emaiProces:Queue
  ) {}

  @Mutation(()=>String)
  async sendemail(@Args('seendEmailDto')email:string,name:string,otp:string){
    
    const emailsend=await this.emailService.sendEmail(email,name,otp);
    await this.emaiProces.add('process',emailsend);
    return emailsend;

    
  }
}
