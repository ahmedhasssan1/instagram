import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RedisService } from './redis.service';
import { setRedisDto } from './dto/set.dto';

@Resolver()
export class RedisResolver {
  constructor(private readonly redisService: RedisService) {}
  @Mutation(()=> String)
  setREdisValue(@Args('keyAndValue')setRedis:setRedisDto):Promise<string>{
    return this.redisService.setValue(setRedis.key,setRedis.value)
  }
}
