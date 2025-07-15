import { All, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreatePostDto } from './dto/posts.dto';
import { UsersService } from 'src/users/users.service';
import { throwError } from 'rxjs';
import { Pageination } from './dto/pagienation.dto';
import { RedisService } from 'src/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private postRepo:Repository<Posts>,
    private userservoce:UsersService,
    private redisService:RedisService,


){}

    async createPost(createPost:CreatePostDto):Promise<Posts>{
        const userExist=await this.userservoce.findOneUser(createPost.user);
        if(!userExist){
            throw new NotFoundException("this user not exist");
        }
        const newPost= this.postRepo.create({
            ...createPost
            ,user:userExist
        });
        return this.postRepo.save(newPost);
   
        
    }      

    async findPost(id:number):Promise<Posts>{
        const findPost=await this.postRepo.findOneBy({id})
        if(!findPost){
            throw new NotFoundException("there no post with this id ");
        }
        return findPost;
    }
    async findAllPosts(pagination: Pageination){
      const { limit, page } = pagination;
      const offset = (page - 1) * limit;
      const cacheKey = `posts_pages_page${page}_limit_${limit}`;

      const cached = await this.redisService.getValue(cacheKey);

      if (cached) {
        console.log('cache hit');
        const parsed = JSON.parse(cached);
        // console.log('debugging ',parsed);
        return plainToInstance(Posts, parsed);
      } else {
        console.log('cache missed');
      }

      const allPosts = await this.postRepo.find({
        skip: offset,
        take: limit,
        order: { created_at: 'DESC' },
      });

      if (!allPosts.length) {
          throw new NotFoundException(`No posts on page ${page}`);
      }

      await this.redisService.setValue(cacheKey, JSON.stringify(allPosts), 60 * 10); // 10 minutes
      return allPosts;
  }



}
