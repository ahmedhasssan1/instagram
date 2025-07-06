import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private userRepo:Repository<Users>){}
    
    async createUser(userDto:CreateUserDto):Promise<Users>{
        const {password,...rest}=userDto;
        const hashPassword=await bcrypt.hash(password,10);
        const user=this.userRepo.create({
            ...rest,
            password:hashPassword
        })
        console.log(hashPassword);
        return this.userRepo.save(user);
    }
    async findOneUser(id:number):Promise<Users>{
        const findUser=await this.userRepo.findOneBy({id});
        if(!findUser){
            throw new NotFoundException("this user not exist");
        }
        return findUser;
    }
    async findUserByEmail(email:string){
        const user=await this.userRepo.findOne({where:{email}});
        if(!user){
            throw new NotFoundException('this user not exist');
        }
        return user
    }
}
