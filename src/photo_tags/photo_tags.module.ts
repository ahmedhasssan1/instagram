import { Module } from '@nestjs/common';
import { PhotoTagsService } from './photo_tags.service';
import { PhotoTagsResolver } from './photo_tags.resolver';

@Module({
  providers: [PhotoTagsResolver, PhotoTagsService],
})
export class PhotoTagsModule {}
