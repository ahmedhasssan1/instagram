import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments/comments.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comments]),
  UsersModule,
  PostsModule  
],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
