import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Followers } from './entity/followers';
import { Repository } from 'typeorm';
import { followerDto } from './dto/follower.dto';
import { validateFollower } from './dto/validateFollowers';
import { UsersService } from 'src/users/users.service';
import { Countfollowers } from './dto/countFollowers.dto';

@Injectable()
export class FollowersService {
    constructor(@InjectRepository(Followers) private readonly followRepo:Repository<Followers>,
    private readonly userSerivce:UsersService
){}
    
    async follow(followDto:followerDto):Promise<Followers>{
        const validateFolllow=validateFollower.safeParse(followDto);
        if(!validateFolllow.success){
            throw new BadRequestException(validateFolllow.error.message)
        }
        const findFollow=await this.followRepo.findOne({where:{leader_id:followDto.leader_id,follower_id:followDto.follower_id}});
        if(findFollow){
            throw new BadRequestException('you can not follow the same user twice')
        }
        const findLeader=await this.userSerivce.findOneUser(followDto.leader_id);
        await this.userSerivce.findOneUser(followDto.follower_id);
        
        const followObj=this.followRepo.create({
            leader_id:followDto.leader_id,
            follower_id:followDto.follower_id
        })

        return await this.followRepo.save(followObj)

    }
    async unfollow(unfollowDto:followerDto):Promise<String>{
        const validateUnFollow=validateFollower.safeParse(unfollowDto)
        if(!validateUnFollow.success){
            throw new BadRequestException(validateUnFollow.error.flatten())
        }
        const findLeader=await this.userSerivce.findOneUser(unfollowDto.leader_id);
        const findFollower=await this.userSerivce.findOneUser(unfollowDto.follower_id);
        if(!findLeader || !findFollower){
            throw new BadRequestException('onr of those user does not exist')
        }
        const findFollow=await this.followRepo.findOne({where:{leader_id:unfollowDto.leader_id,follower_id:unfollowDto.follower_id}});
        if(!findFollow){
            throw new NotFoundException("you are not follow thi user to unfollow him")
        }
        await this.followRepo.remove(findFollow);
        return 'unfollow done'
        
    }
    async countFollowers(userId:number):Promise<number>{
        await this.userSerivce.findOneUser(userId);
        const [followers,count]=await this.followRepo.findAndCount({where:{leader_id:userId}});
        if(!followers){
            throw new NotFoundException("this user does not have followers")
        }
        return count
    }
}
