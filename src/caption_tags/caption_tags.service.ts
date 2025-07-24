import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptionTags } from './entity/caption_tags.entity';
import { Repository } from 'typeorm';
import { CaptionTagsDto } from './dto/captiontags.dto';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CaptionTagsService {
    constructor(@InjectRepository(CaptionTags) private CaptionTagRepo:Repository<CaptionTags>,
    private postService:PostsService,
    private UserService:UsersService
){}
    async createCaptionTag(captiontag:CaptionTagsDto):Promise<CaptionTags>{
        const findPost=await this.postService.findPost(captiontag.postID);
        const findUser=await this.UserService.findOneUser(captiontag.userID);
        const findTag=await this.CaptionTagRepo.findOne({where:{post:{id:captiontag.postID,user:{id:captiontag.userID}}}});
        if(findTag){
            throw new BadRequestException("this user alradt  you tagged  him");
        }
        const newCaption_tag=await this.CaptionTagRepo.create({
            post:findPost,
            user:findUser
        })
        return await this.CaptionTagRepo.save(newCaption_tag)
    }

}
