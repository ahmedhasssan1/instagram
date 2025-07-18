import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from 'typeorm';
import { LikeDto } from './dro/like.dto';
import { Likes } from './entity/likes.entity';

@Resolver()
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}
  @Mutation(() => String)
  async createLike(@Args('likeDto') like: LikeDto) {
    return await this.likesService.createLike(like);
  }
  @Mutation(()=>String)
  async dislike(@Args('dislike')like:LikeDto){
    return await this.likesService.dislike(like)
  }
}
  