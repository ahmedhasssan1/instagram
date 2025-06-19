import { Module } from '@nestjs/common';
import { MessageBirdResolver } from './message.resolver';
import { MessageBirdService } from './message.service';

@Module({
  providers: [
    MessageBirdResolver, // <-- Move resolver here
    MessageBirdService,
    {
      provide: 'MessageBirdClient',
      useFactory: async () => {
        return import('messagebird').then((messagebird: any) => {
          const client = messagebird(process.env.MESSAGE_BIRD_LIVE_KEY);
          return client;
        });
      },
    },
  ],
})
export class MessageBirdModule {}