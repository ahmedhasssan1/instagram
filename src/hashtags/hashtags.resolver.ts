import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HashtagsService } from './hashtags.service';
import { Hashtag } from './entity/hashtag.entity';
import { HashtagDto } from './dto/createHashtag.dto';
import { string } from 'zod';
import id from 'zod/v4/locales/id.cjs';

@Resolver()
export class HashtagsResolver {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Mutation(()=>Hashtag)
  async CreateHastag(@Args('title')hashtag:HashtagDto){
   return await this.hashtagsService.CreateHastag(hashtag);
  }

  @Mutation(()=>String)
  async deleteHashtag(@Args('id')id:number){
    return await this.hashtagsService.DeleteHshtag(id);
  }
  @Query(()=>Hashtag)
  async findHastag(@Args('id')id:number){
    return await this.hashtagsService.findHashtag(id);
  }
}
