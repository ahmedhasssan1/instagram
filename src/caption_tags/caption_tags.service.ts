import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptionTags } from './entity/caption_tags.entity';
import { Repository } from 'typeorm';
import { CaptionTagsDto } from './dto/captiontags.dto';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Posts } from 'src/posts/entity/posts.entity';

@Injectable()
export class CaptionTagsService {
    constructor(@InjectRepository(CaptionTags) private CaptionTagRepo:Repository<CaptionTags>,
    private postService:PostsService,
    private UserService:UsersService
){}
    async createCaptionTag(captiontag:CaptionTagsDto):Promise<CaptionTags>{
        const findPost=await this.postService.findPost(captiontag.postID);
        const findUser=await this.UserService.findOneUser(captiontag.userID);
        const findTag=await this.CaptionTagRepo.findOne({where:{post:{id:captiontag.postID} ,user:{id:captiontag.userID}},relations:['user','post']});
        if(findTag){
            throw new BadRequestException("this user alradt  you tagged  him");
        }
        const newCaption_tag=await this.CaptionTagRepo.create({
            post:findPost,
            user:findUser
        })
        return await this.CaptionTagRepo.save(newCaption_tag)
    }
    async  getCaptionTags(postID:number):Promise<CaptionTags[]>{
        const findCaptionTags=await this.CaptionTagRepo.find({where:{post:{id:postID}},relations:['post','user']});
        if (!findCaptionTags){
            throw new NotFoundException('this post  do not have caption tags')

        }
        return findCaptionTags

    }
    async deleteCaptiontag(id:number):Promise<string>{
        const findCaptiontag=await this.CaptionTagRepo.findOne({where:{id}});
        if(!findCaptiontag){
            throw new NotFoundException("this caption not exist")
        }
        await this.CaptionTagRepo.remove(findCaptiontag);
        return 'caption Tag Deleted';
    }

}

