import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { EmailService } from "./email.service";

@Processor('main-queue')
export class EmailQueue extends WorkerHost{
    constructor(private emailService:EmailService){
        super()
    }
    async process(job: Job) {
        const {email,otp,name}=job.data
        console.log('got job name',job.data.name)
        await this.emailService.sendOtpEmail(email,otp,name);
        console.log(`job with id ${job.id} completeed`);
        
    }
}