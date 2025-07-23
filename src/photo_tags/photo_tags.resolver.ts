import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhotoTagsService } from './photo_tags.service';
import { PhotoTags } from './entity/photo_tags.entity';
import { PhotoTagsDto } from './dto/photoTags.dto';

@Resolver()
export class PhotoTagsResolver {
  constructor(private readonly photoTagsService: PhotoTagsService) {}

  @Mutation(()=>PhotoTags)
  async createPhotoTags(@Args('tagsDto')photoTags:PhotoTagsDto){
    return await this.photoTagsService.create_photoTags(photoTags)
  }
  @Query(()=>[PhotoTags])
  async getphotoTags(@Args('postId')postid:number){
    return await this.photoTagsService.findPostTags(postid)
  }
}
