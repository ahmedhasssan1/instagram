import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowersService } from './followers.service';
import { followerDto } from './dto/follower.dto';
import { Followers } from './entity/followers';
import { number, string } from 'zod';

@Resolver()
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) {}
  @Mutation(()=>Followers)
  async follow(@Args('followDto')follow:followerDto):Promise<Followers>{
    return await this.followersService.follow(follow)
  }
  @Mutation(()=>String)
  async unFollow(@Args('unFollowDto')unfollow:followerDto):Promise<String>{
    return await this.followersService.unfollow(unfollow)
  }
  @Query(()=>Number)
  async countFolllowers(@Args('countFollowersDto')userId:number){
    return await this.followersService.countFollowers(userId)
  }
}
