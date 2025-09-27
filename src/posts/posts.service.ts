import { All, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/posts.dto';
import { UsersService } from 'src/users/users.service';
import { RedisService } from 'src/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { PaginationInput } from './dto/pagination.input';
import { PaginatedPosts } from './dto/pagienation.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
    private userservoce: UsersService,
    private redisService: RedisService,
  ) {}

  async createPost(createPost: CreatePostDto): Promise<Posts> {
    const userExist = await this.userservoce.findOneUser(createPost.user);
    if (!userExist) {
      throw new NotFoundException('this user not exist');
    }
    const newPost = this.postRepo.create({
      ...createPost,
      user: userExist,
    });
    return this.postRepo.save(newPost);
  }

  async findPost(id: number): Promise<Posts> {
    const findPost = await this.postRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!findPost) {
      throw new NotFoundException('there no post with this id ');
    }
    return findPost;
  }
  async findAllPosts(pagination: PaginationInput): Promise<PaginatedPosts> {
  const { limit, page } = pagination;
  const offset = (page - 1) * limit;
  const cacheKey = `posts_page_${page}_limit_${limit}`;

  const cached = await this.redisService.getValue(cacheKey);
  if (cached) {
    console.log('cache hit');
    return JSON.parse(cached) as PaginatedPosts;
  }

  console.log('cache missed');

  const [items, totalCount] = await this.postRepo.findAndCount({
    skip: offset,
    take: limit,
  });

  if (!items.length) {
    throw new NotFoundException(`No posts on page ${page}`);
  }

  const allPosts = await this.postRepo.find();

  const response: PaginatedPosts = { items, totalCount, allPosts };

  await this.redisService.setValue(cacheKey, JSON.stringify(response), 60 * 10);

  return response;
}

  async save(post: Posts): Promise<Posts> {
    return this.postRepo.save(post);
  }
}
