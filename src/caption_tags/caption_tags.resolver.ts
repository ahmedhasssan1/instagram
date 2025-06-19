import { Resolver } from '@nestjs/graphql';
import { CaptionTagsService } from './caption_tags.service';

@Resolver()
export class CaptionTagsResolver {
  constructor(private readonly captionTagsService: CaptionTagsService) {}
}
