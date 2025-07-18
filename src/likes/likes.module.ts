import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entity/likes.entity';
import { PostsModule } from 'src/posts/posts.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports:[TypeOrmModule.forFeature([Likes]),PostsModule,CommentsModule],
  providers: [LikesResolver, LikesService],

})
export class LikesModule {}
