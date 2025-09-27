import { forwardRef, Module } from '@nestjs/common';
import { BullmqService } from './bullmq.service';
import { EmailModule } from 'src/email/email.module';
import { EmailQueue } from './bullmq.worker';
import { AuthModule } from 'src/auth/auth.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    forwardRef(() => EmailModule),
    forwardRef(() => AuthModule),
    BullModule.registerQueue({
      name: 'main-queue',
    }),
  ],
  providers: [EmailQueue, BullmqService],
})
export class BullmqModule {}
