import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entity/comments.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtGuard } from 'src/auth/guradAuth/check_JWT';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '1d' }, 
    }),UsersModule, PostsModule,RedisModule],
  providers: [CommentsResolver, CommentsService,JwtGuard],
  exports:[CommentsService]
})
export class CommentsModule {}
