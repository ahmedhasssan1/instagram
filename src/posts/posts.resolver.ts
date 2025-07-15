import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Posts } from './entity/posts.entity';
import { CreatePostDto, PaginatedPosts } from './dto/posts.dto';
import { RedisService } from 'src/redis/redis.service';
import { Pageination } from './dto/pagienation.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService,
  @InjectQueue('email') private readonly emailQueue:Queue

  ) {}

    @Mutation(()=>Posts)
    async createPost(@Args('createPost') createPost:CreatePostDto):Promise<Posts>{
      return this.postsService.createPost(createPost)
    }
    @Query(()=>Posts)
    async findPost(@Args('findPost') id:number):Promise<Posts>{
      return this.postsService.findPost(id);
    }
    @Query(()=>[Posts])
    async findAllPost(@Args('pagination') paginationDto:Pageination){
      return await this.postsService.findAllPosts(paginationDto)
    }
}
