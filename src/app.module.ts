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
import { MessageModule } from './message/message.module';

@Module({
  imports:[
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/schema.gql'),
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
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'], 
      synchronize: true, 
      autoLoadEntities:true
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
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
