import { Module } from '@nestjs/common';
import { CaptionTagsService } from './caption_tags.service';
import { CaptionTagsResolver } from './caption_tags.resolver';

@Module({
  providers: [CaptionTagsResolver, CaptionTagsService],
})
export class CaptionTagsModule {}
