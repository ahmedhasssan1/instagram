import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Likes } from './entity/likes.entity';
import { LikeDto } from './dro/like.dto';
import { PostsService } from 'src/posts/posts.service';
import { likesValidation } from './dro/likeValidation.zod';
import th from 'zod/v4/locales/th.cjs';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Likes) private  likesRepo:Repository<Likes>,
        private readonly postService:PostsService,
        private readonly commentService:CommentsService
    ){}
        
    async createLike(like:LikeDto):Promise<string>{
        const validateLike=likesValidation.safeParse(like);
        if(!validateLike.success){
            throw new BadRequestException(validateLike.error.flatten())
        }
        let findlike;
        if(like.target=="post"){
             findlike=await  this.likesRepo.findOne({
                where:{
                    user_id:like.user_id ,
                    post_id:like.post_id
                }
            })
            const postExist=await this.postService.findPost(like.post_id);
            if(!postExist){
                throw new NotFoundException('this post not exist anymore');
            }
             postExist.likescount++;
            await this.postService.save(postExist)

        }else if(like.target=="comment"){
                findlike=await  this.likesRepo.findOne({where:{user_id:like.user_id,comment_id:like.comment_id}});
                if(findlike){
                    throw new BadRequestException("this user elready likes this post")
                }
                const commentExist=await this.commentService.findComment(like.comment_id);
                if(!commentExist){
                    throw new NotFoundException("this comment not exist")
                }
                commentExist.likesCount++;
                await this.commentService.save(commentExist)
        }

        if(findlike){
            throw new BadRequestException('this user already  like the post before')
        }
     
        await this.likesRepo.save(like)
        return 'like done';

    }



    async dislike(like:LikeDto):Promise<String>{
        const validate=likesValidation.safeParse(like);
        if(!validate.success){
            throw new BadRequestException(validate.error.flatten())
        }
        if(like.target=='post'){
            const findLike=await  this.likesRepo.findOne({where:{user_id:like.user_id ,post_id:like.post_id}})
            const postExist=await this.postService.findPost(like.post_id);
            if(!postExist){
                throw new NotFoundException('this post not exist anymore');
            }
            if(findLike){
                await this.likesRepo.remove(findLike);
            }else{
                return 'this user did not like this post';
            }
            if(postExist.likescount>0){
            postExist.likescount--;
            }
            await this.postService.save(postExist);
        }else if(like.target=="comment") {
              const findLike=await  this.likesRepo.findOne({where:{user_id:like.user_id ,comment_id:like.comment_id}})
            const commentExist=await this.commentService.findComment(like.comment_id);
            if(!commentExist){
                throw new NotFoundException('this comment not exist anymore');
            }
            if(findLike){
                await this.likesRepo.remove(findLike);
            }else{
                return 'this user did not like this post';
            }
            if(commentExist.likesCount>0){
                commentExist.likesCount--;
            }
            await this.commentService.save(commentExist);
        }   
        return "dislike done";
        
    }

}
