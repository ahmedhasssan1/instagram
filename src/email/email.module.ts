import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { EmailProcessor } from './email.processor';
import { QueueModule } from 'src/common/bullQm/queue.module';

@Module({
  imports:[QueueModule],
  providers: [EmailResolver, EmailService,EmailProcessor],
  exports:[EmailService]
})
export class EmailModule {}
