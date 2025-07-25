import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaptionTagsService } from './caption_tags.service';
import { CaptionTags } from './entity/caption_tags.entity';
import { CaptionTagsDto } from './dto/captiontags.dto';
import { queryObjects } from 'v8';

@Resolver()
export class CaptionTagsResolver {
  constructor(private readonly captionTagsService: CaptionTagsService) {}
  
  @Mutation(()=>CaptionTags)
  async createCaptionTag(@Args("captionTagDto")captionTag:CaptionTagsDto){
    return await this.captionTagsService.createCaptionTag(captionTag);
  }

  @Query(()=>[CaptionTags])
  async getpostCaptioTag(@Args('postCaptionTagPostID')postId:number){
    return await this.captionTagsService.getCaptionTags(postId);
  }
  @Mutation(()=>String)
  async deleteCaptioTag(@Args('captionTagId')CaptionTagID:number){
    return await this.captionTagsService.deleteCaptiontag(CaptionTagID)
  }
}
