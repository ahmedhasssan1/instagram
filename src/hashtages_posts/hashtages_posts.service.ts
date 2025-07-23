import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTagPosts } from './entity/hashtag_posts.entity';
import { Repository } from 'typeorm';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { Hashtag_postDto } from './dto/hashTag_post.dto';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class HashtagesPostsService {
    constructor(@InjectRepository(HashTagPosts) private hashTagPostsRepo:Repository<HashTagPosts>,
    private hashTagService:HashtagsService,
    private postService:PostsService
){}

    async create_hashTag_Posts(hashTag:Hashtag_postDto):Promise<HashTagPosts>{
        const findHasTag=await this.hashTagService.findHashtag(hashTag.hashtag_id);
        const findPost=await this.postService.findPost(hashTag.post_id);

        const NewPostHashTag=await this.hashTagPostsRepo.create({
            hashTag:findHasTag,
            post:findPost
        })
        await this.hashTagPostsRepo.save(NewPostHashTag);

        return NewPostHashTag
    }
}
