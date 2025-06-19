import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/posts.dto';
import { UsersService } from 'src/users/users.service';
import { throwError } from 'rxjs';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private postRepo:Repository<Posts>,
    private userservoce:UsersService

){}

    async createPost(createPost:CreatePostDto):Promise<Posts>{
        const userExist=await this.userservoce.findOneUser(createPost.user);
        if(!userExist){
            throw new NotFoundException("this user not exist");
        }
        const newPost= this.postRepo.create({
            ...createPost
            ,user:userExist
        });
        return this.postRepo.save(newPost);
   
        
    }      

    async findPost(id:number):Promise<Posts>{
        const findPost=await this.postRepo.findOneBy({id})
        if(!findPost){
            throw new NotFoundException("there no post with this id ");
        }
        return findPost;
    }



}
