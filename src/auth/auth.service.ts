import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { otpDto } from './dto/otp.dto';


const blacklist = new Set();

@Injectable()
export class AuthService {
    constructor(private userService:UsersService,
        private jwtService:JwtService
    ){}
    
    async login(login:LoginDto){
        
        const userExist=await this.userService.findUserByEmail(login.email)
        if(!userExist){
            throw new NotFoundException("this user with this email not exist");

        }
        const matchPassword=await bcrypt.compare(login.password,userExist.password)
        if(!matchPassword){
            throw new UnauthorizedException("the password is inncorect")
        }
        const payload={
            sub:userExist.id,
            email:userExist.email,
        }
        const accessToken=await this.jwtService.signAsync(payload);
        return accessToken
    }
    async logout(logout:LoginDto){
        const user=await this.userService.findUserByEmail(logout.email);
        if(!user){
            throw new UnauthorizedException("this user npt exist");
        }
        user.status="offline";
        blacklist.add(user.email);
    }

    async otpRequest(otp:otpDto){
        

    }
}
