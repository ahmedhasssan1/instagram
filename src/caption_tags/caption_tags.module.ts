import { Module } from '@nestjs/common';
import { CaptionTagsService } from './caption_tags.service';
import { CaptionTagsResolver } from './caption_tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaptionTags } from './entity/caption_tags.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([CaptionTags]),PostsModule,UsersModule],
  providers: [CaptionTagsResolver, CaptionTagsService],
})
export class CaptionTagsModule {}
