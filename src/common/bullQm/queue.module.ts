// // src/queue/queue.module.ts
// import { BullModule } from '@nestjs/bullmq';
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     BullModule.forRoot({
//       connection:{
//         host: '192.168.116.128',
//         port: Number(process.env.REDIS_PORT)||6379 ,
//       },
//       defaultJobOptions:{attempts:3,removeOnComplete: true}
//     }),
//     BullModule.registerQueue({
//       name: 'test',
      
//     }),
//   ],
//   exports: [BullModule],
// })
// export class QueueModule {}
