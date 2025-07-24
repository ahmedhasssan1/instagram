import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CaptionTagsService } from './caption_tags.service';
import { CaptionTags } from './entity/caption_tags.entity';
import { CaptionTagsDto } from './dto/captiontags.dto';

@Resolver()
export class CaptionTagsResolver {
  constructor(private readonly captionTagsService: CaptionTagsService) {}
  
  @Mutation(()=>CaptionTags)
  async createCaptionTag(@Args("captionTagDto")captionTag:CaptionTagsDto){
    return await this.captionTagsService.createCaptionTag(captionTag);
  }
}
