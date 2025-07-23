import { Module } from '@nestjs/common';
import { HashtagesPostsService } from './hashtages_posts.service';
import { HashtagesPostsResolver } from './hashtages_posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTagPosts } from './entity/hashtag_posts.entity';
import { HashtagsModule } from 'src/hashtags/hashtags.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[TypeOrmModule.forFeature([HashTagPosts]),HashtagsModule,PostsModule],
  providers: [HashtagesPostsResolver, HashtagesPostsService],
})
export class HashtagesPostsModule {}
