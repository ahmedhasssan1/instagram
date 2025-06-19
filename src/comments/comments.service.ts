import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/createComment.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comments) private CommentRepo:Repository<Comments>,
    private userService:UsersService,
    private postService:PostsService
){}

    async createComment(createComment:CreateCommentInput):Promise<Comments>{
        const{userId,postId}=createComment;

        const finduser=await this.userService.findOneUser(userId);
        if(!finduser){
            throw new NotFoundException('this user not exist')
        }
        const findPost=await this.postService.findPost(postId);
        if(!findPost){
            throw new NotFoundException('this post not exist');
        }
        findPost.commentCount++;

        const newComment=this.CommentRepo.create({...createComment,
            user:finduser,
            post:findPost
        });
        return this.CommentRepo.save(newComment);
        
    }
}
