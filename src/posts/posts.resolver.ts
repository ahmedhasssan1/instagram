import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Posts } from './entity/posts.entity';
import { CreatePostDto } from './dto/posts.dto';
import { NotFoundException } from '@nestjs/common';
import { PaginatedPosts } from './dto/pagienation.dto';
import { PaginationInput } from './dto/pagination.input';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Posts)
  async createPost(
    @Args('createPost') createPost: CreatePostDto,
  ): Promise<Posts> {
    return this.postsService.createPost(createPost);
  }
  @Query(() => Posts)
  async findPost(@Args('findPost') id: number): Promise<Posts> {
    return this.postsService.findPost(id);
  }
  @Query(() => PaginatedPosts)
  async findAllPost(
    @Args('pagination', { nullable: true }) paginationDto: PaginationInput,
  ): Promise<PaginatedPosts> {
    const result = await this.postsService.findAllPosts(paginationDto);

    if (!result) {
      throw new NotFoundException('No result found');
    }

    return result;
  }
}
