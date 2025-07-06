import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { Sendemaildto } from './dto/sendEmail.input';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(()=>String)
  sendemail(@Args('seendEmailDto')email:string,name:string,otp:string){
    return this.emailService.sendEmail(email,name,otp);
    
  }
}
