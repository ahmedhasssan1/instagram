import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
// import { EmailProcessor } from './email.processor';
import { BullModule } from '@nestjs/bullmq';
import { EmailQueue } from './email.worker';

@Module({
  imports:[BullModule.registerQueue({
    name:'main-queue'
  })
  ],
  providers: [EmailResolver, EmailService,EmailQueue],
  exports:[EmailService]
})
export class EmailModule {}
