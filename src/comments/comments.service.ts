import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entity/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/createComment.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { DeleteCommentDto } from './dto/deleteComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private CommentRepo: Repository<Comments>,
    private userService: UsersService,
    private postService: PostsService,
  ) {}

  async createComment(createComment: CreateCommentInput): Promise<Comments> {
    const { userId, postId } = createComment;

    const finduser = await this.userService.findOneUser(userId);
    if (!finduser) {
      throw new NotFoundException('this user not exist');
    }
    const findPost = await this.postService.findPost(postId);
    if (!findPost) {
      throw new NotFoundException('this post not exist');
    }
    findPost.commentCount++;
    await this.postService.save(findPost)

    const newComment = this.CommentRepo.create({
      ...createComment,
      user_id: finduser.id,
      post: findPost,
    });
    return this.CommentRepo.save(newComment);
  }
  async findComment(id:number):Promise<Comments>{
    const findComment=await this.CommentRepo.findOne({where:{id}})
    if(!findComment){
      throw new NotFoundException("this comment not exist");
    }
    return findComment;
  }
  async save(comment:Comments):Promise<Comments>{
    return await this.CommentRepo.save(comment)

  }
  async deleteComment(deleteComment:DeleteCommentDto):Promise<String>{
    const findComment=await this.CommentRepo.findOne({where:{id:deleteComment.comment_id}});
    if(!findComment){
      throw new NotFoundException("thi comment not exist")
    }
    const findPostOwner=await this.postService.findPost(deleteComment.post_id);
  

    if(!findPostOwner){
      throw new NotFoundException("this post not exist anymore")
    }

    if((findComment.user_id==deleteComment.user_id || findPostOwner.user.id==deleteComment.user_id)){
      await this.CommentRepo.remove(findComment);
        if(findPostOwner.commentCount>0){
          findPostOwner.commentCount--;
          await this.postService.save(findPostOwner);
        }
        return 'this comment has benn deleted'
    }else{
      return 'this user do not have right to delte thios comment'
    }

  }

}
