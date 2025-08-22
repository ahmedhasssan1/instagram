import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/createComment.dto';
import { Comments } from './entity/comments.entity';
import { DeleteCommentDto } from './dto/deleteComment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guradAuth/check_JWT';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService,
  ) {}

  @Mutation(() => Comments)
  createComment(
    @Args('createCommentinput') createComment: CreateCommentInput,
  ): Promise<Comments> {
    return this.commentsService.createComment(createComment);
  }
  @UseGuards(JwtGuard)
  @Query(()=>Comments)
  async findComment(@Args('commentId')id:number){
    return await this.commentsService.findComment(id);
  }
  @Mutation(()=>String)
  async deleteComment(@Args('deleteCommentDto')deleteDto:DeleteCommentDto){
    const res=await this.commentsService.deleteComment(deleteDto)
    return res;
  }
}
