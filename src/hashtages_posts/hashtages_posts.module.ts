import { Module } from '@nestjs/common';
import { HashtagesPostsService } from './hashtages_posts.service';
import { HashtagesPostsResolver } from './hashtages_posts.resolver';

@Module({
  providers: [HashtagesPostsResolver, HashtagesPostsService],
})
export class HashtagesPostsModule {}
