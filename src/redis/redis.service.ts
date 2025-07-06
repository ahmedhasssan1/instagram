import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { setRedisDto } from './dto/set.dto';

@Injectable()
export class RedisService {

    constructor(@Inject('REDIS_CLIENT') private readonly redisCliennt:Redis){}

    async setValue(key:string,value:string,exp?:number){
        if(exp){
            return this.redisCliennt.set(key,value,"EX",exp);
        }
        return this.redisCliennt.set(key,value)
    }
    async getValue(key:string){
        return this.redisCliennt.get(key)
    }
}
