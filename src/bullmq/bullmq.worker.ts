import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { otpService } from 'src/auth/otp.service';
import { EmailService } from 'src/email/email.service';

@Processor('main-queue', { concurrency: 2 })
export class EmailQueue extends WorkerHost {
  constructor(
    private emailService: EmailService,
    private otpService: otpService,
  ) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case 'email-queue':{
        const { email, otp, name } = job.data;
        console.log('got job name', job.data.name);
        await this.emailService.sendOtpEmail(email, otp, name);
        console.log(`job with id ${job.id} completeed`);
        break;
      }

      case 'otp-process':{
        const { email, name } = job.data;
        console.log('got job name', job.data.name);
        await this.otpService.requestOtp(email, name);
        console.log(`job with id ${job.id} completeed`);

        break;
      }
    }
  }
}
