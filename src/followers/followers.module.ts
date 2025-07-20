import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersResolver } from './followers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from './entity/followers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Followers]),UsersModule],
  providers: [FollowersResolver, FollowersService],
})
export class FollowersModule {}
