import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisResolver } from './redis.resolver';
import Redis from 'ioredis';

@Module({
  providers: [
  {
    provide:'REDIS_CLIENT',
    useFactory:()=>{
      return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) ,
      })
    }
  },RedisResolver, RedisService
],
  exports:['REDIS_CLIENT',RedisService]
})
export class RedisModule {}
