import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('test')
export class EmailProcessor extends WorkerHost{
    async process(email:Job){
     await new Promise((resolve)=>setTimeout(resolve,5000));   
    }

    @OnWorkerEvent('active')
    onadded(email:Job){
        console.log(`got a new email with id ${email.id}`);
        
    }
    @OnWorkerEvent('completed')
    onComplete(email:Job){
     console.log(`recive a new email with id ${email.id}`);

    }
    @OnWorkerEvent('failed')
    onFailed(email:Job){
     console.log(`faield  a new email with id ${email.id}`);

    }
}