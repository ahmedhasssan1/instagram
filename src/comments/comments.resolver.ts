import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/createComment.dto';
import { Comments } from './comments/comments.entity';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(()=>Comments)
  createComment(@Args('createCommentinput') createComment:CreateCommentInput):Promise<Comments>{
    return this.commentsService.createComment(createComment)
  }

}
