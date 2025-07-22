import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entity/hashtag.entity';
import { Repository } from 'typeorm';
import { HashtagDto } from './dto/createHashtag.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class HashtagsService {
    constructor(@InjectRepository(Hashtag) private readonly hashtagRepo:Repository<Hashtag>){}

    async CreateHastag(hashtagdto:HashtagDto):Promise<Hashtag>{
        if(!hashtagdto.title.startsWith('#')){
            throw new BadRequestException("the hashtag must be start with # ")
        }
        if(/\s/.test(hashtagdto.title)){
            throw new BadRequestException('hashtag can not constain space')
        }
        const hashtag=await this.hashtagRepo.findOne({where:{title:hashtagdto.title}});
        if(hashtag){
            throw new BadRequestException('this hashtag already rexist');
        }
        const createHastag=this.hashtagRepo.create(hashtagdto);
        await this.hashtagRepo.save(createHastag);
        return createHastag;
    }
    async DeleteHshtag(id:number):Promise<string>{

        const findHastag=await this.hashtagRepo.findOne({where:{id}})
        if(!findHastag){
            throw new NotFoundException("this hashtag id not exist");
        }
        await this.hashtagRepo.remove(findHastag)
        return 'hashtag deleted'

    }
    async findHashtag(id:number):Promise<Hashtag>{
        const FindHastag=await this.hashtagRepo.findOne({where:{id}})
        if(!FindHastag){
            throw new NotFoundException('there is no hatag with this id')
        }
        return FindHastag;
    }


}
