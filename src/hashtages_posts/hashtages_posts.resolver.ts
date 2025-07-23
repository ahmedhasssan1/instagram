import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HashtagesPostsService } from './hashtages_posts.service';
import { HashTagPosts } from './entity/hashtag_posts.entity';
import { Hashtag_postDto } from './dto/hashTag_post.dto';

@Resolver()
export class HashtagesPostsResolver {
  constructor(private readonly hashtagesPostsService: HashtagesPostsService) {}
  @Mutation(()=>HashTagPosts)
  async create_HashTagPost(@Args('hashTagPostDto')hashTagPostDto:Hashtag_postDto){
    return await this.hashtagesPostsService.create_hashTag_Posts(hashTagPostDto)
  }
}
