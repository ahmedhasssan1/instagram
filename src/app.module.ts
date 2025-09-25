import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PhotoTagsModule } from './photo_tags/photo_tags.module';
import { CaptionTagsModule } from './caption_tags/caption_tags.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { HashtagesPostsModule } from './hashtages_posts/hashtages_posts.module';
import { FollowersModule } from './followers/followers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guradAuth/check_JWT';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/schema.gql'),
      context: ({ req,res }) => ({ req,res}),   
      playground: {
        settings: {
        "request.credentials": "include", 
        }
      },

    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000, 
      username: 'postgres',
      password:process.env.data_base_pass,
      database: process.env.dataBaseName,
      synchronize: true, 
      autoLoadEntities:true,
      // ssl:{secureProtocol:'TLSv1_3_method'}
    }),

    
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    PhotoTagsModule,
    CaptionTagsModule,
    HashtagsModule,
    HashtagesPostsModule,
    FollowersModule,
    FirebaseModule,
    AuthModule,
    RedisModule,
    
  ],
  controllers: [AppController],
  providers: [JwtService,
    AppService,{
    provide:APP_GUARD,
    useClass:JwtGuard
  }
],
})
export class AppModule {}
