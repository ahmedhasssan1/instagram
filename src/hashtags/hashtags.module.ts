import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsResolver } from './hashtags.resolver';

@Module({
  providers: [HashtagsResolver, HashtagsService],
})
export class HashtagsModule {}
