import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoTags } from './entity/photo_tags.entity';
import { Repository } from 'typeorm';
import { PhotoTagsDto } from './dto/photoTags.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { knex } from 'src/knex';

@Injectable()
export class PhotoTagsService {
  constructor(
    @InjectRepository(PhotoTags) private PhotoTageRepo: Repository<PhotoTags>,
    private readonly UserServie: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async create_photoTags(photoTag: PhotoTagsDto): Promise<PhotoTags> {
    const findUser = await this.UserServie.findOneUser(photoTag.userId);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const findPost = await this.postsService.findPost(photoTag.postId);
    if (!findPost) {
      throw new NotFoundException('Post not found');
    }
    const isFollowing = await knex('followers')
      .where({
        leader_id: findPost.user.id,
        follower_id: findUser.id,
      })
      .first();
    if (!isFollowing) {
      throw new BadRequestException('this user not followed the post owner');
    }
    const findTag = await this.PhotoTageRepo.findOne({
      where: { user: { id: photoTag.userId }, post: { id: photoTag.postId } },
      relations: ['user', 'post'],
    });
    if (findTag) {
      throw new BadRequestException(
        'this user already you meantion him in this post',
      );
    }
    const newTag = await this.PhotoTageRepo.create({
      post: findPost,
      user: findUser,
      x: photoTag.x,
      y: photoTag.y,
    });
    return await this.PhotoTageRepo.save(newTag);
  }
  async findPostTags(postId: number): Promise<PhotoTags[]> {
    const findTags = await this.PhotoTageRepo.find({
      where: { post: { id: postId } },
      relations: ['post', 'user'],
    });
    if (!findTags) {
      throw new NotFoundException('there is no tags  with  this  post');
    }
    return findTags;
  }
}
