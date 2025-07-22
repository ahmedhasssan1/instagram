import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsResolver } from './hashtags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entity/hashtag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Hashtag])],
  providers: [HashtagsResolver, HashtagsService],
})
export class HashtagsModule {}
