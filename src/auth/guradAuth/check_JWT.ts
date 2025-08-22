
import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

 export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
@Injectable()
export class JwtGuard implements CanActivate{
    constructor(private jwtService:JwtService,
        private readonly redisService:RedisService,
        private reflector:Reflector
    ){}

    async canActivate (context:ExecutionContext):Promise<boolean>{
        const ctx=GqlExecutionContext.create(context);
        const req=ctx.getContext().req;


       const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

        const token=req.cookies?.access_token;
        if(!token){
            throw new UnauthorizedException("this user not looged in");

        }
        const find_JWT_in_blaclist=await this.redisService.getValue(`blaclist:${token}`);
        if(find_JWT_in_blaclist){
            throw new UnauthorizedException('this user has been revoked')
        }
        try{    
            const payload=await this.jwtService.verifyAsync(token,{
                    secret:process.env.jwt_sercet
                }
            )
            req.user=payload
            return true;    

        }catch(error){
            throw new UnauthorizedException("invalid user ")

        }
    }

}
