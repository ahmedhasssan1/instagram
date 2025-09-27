import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
// import { EmailProcessor } from './email.processor';
import { BullModule } from '@nestjs/bullmq';
// import { EmailQueue } from './email.worker';
import { AuthModule } from 'src/auth/auth.module';
import { BullmqModule } from 'src/bullmq/bullmq.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'main-queue',
    }),
     AuthModule,
     BullmqModule,
  ],
  providers: [EmailResolver, EmailService],
  exports: [EmailService],
})
export class EmailModule {}
