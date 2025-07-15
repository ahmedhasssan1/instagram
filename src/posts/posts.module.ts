import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import { PostQueue } from 'src/common/bullQm/queue.service';

@Module({
  imports:[TypeOrmModule.forFeature([Posts]),UsersModule,RedisModule,
    BullModule.registerQueue({name:'test'},{name:'email'}),
],
  providers: [PostsResolver, PostsService,PostQueue],
  exports:[PostsService]
})
export class PostsModule {}
