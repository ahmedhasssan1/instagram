import { Module } from '@nestjs/common';
import { PhotoTagsService } from './photo_tags.service';
import { PhotoTagsResolver } from './photo_tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoTags } from './entity/photo_tags.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[TypeOrmModule.forFeature([PhotoTags]),UsersModule,PostsModule],
  providers: [PhotoTagsResolver, PhotoTagsService],
})
export class PhotoTagsModule {}
