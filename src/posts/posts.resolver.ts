import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Posts } from './entity/posts.entity';
import { CreatePostDto } from './dto/posts.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

    @Mutation(()=>Posts)
    async CreatePostDto(@Args('createPost') createPost:CreatePostDto):Promise<Posts>{
      return this.postsService.createPost(createPost)
    }
    @Query(()=>Posts)
    async findPost(@Args('findPost') id:number):Promise<Posts>{
      return this.postsService.findPost(id);
    }
    
}
