// import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { otpService } from './otp.service';
import {  resetPasswordDto } from './dto/otp.dto';
import { UsersService } from 'src/users/users.service';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'; 
import { Request } from 'express'; 
import { Response } from 'express';
import { RedisService } from 'src/redis/redis.service';
import { NotFoundException } from '@nestjs/common';
import { Public } from './guradAuth/check_JWT';
import { object } from 'zod';
import { LoginResponseDto } from './dto/token.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private readonly otpservice:otpService,
    private readonly userservice:UsersService,
    private readonly redisservice:RedisService
  ) {}


 @Mutation(()=>LoginResponseDto)
 @Public()
  async login(
    @Args('login') login: LoginDto,
    @Context() context: {req:Request,res:Response},
  ) {
    const result=await this.authService.login(login,context.res);
    return result;
  }


@Mutation(() => String)
sendOtp(
  @Args('email') email: string,
  @Args('name') name: string,
) {
  return this.otpservice.requestOtp(email, name);
}
@Mutation(()=>String)
  async verfication(@Args('otp')otp:resetPasswordDto){
    await this.otpservice.verifyOtp(otp.email,otp.otp);
    const result = await this.userservice.newPassword(otp);

    if (!result) {
      throw new Error('newPassword returned null or undefined');
    }

    return result;
  }
@Mutation(() => String)
async logout(@Context() ctx: { res: Response,req:Request }) {
  const token=ctx.req.cookies?.access_token;
  if(!token){
    throw new NotFoundException("no jwt exist in req")
  }
  await this.redisservice.setValue(`blaclist:${token}`,'true',3500)
  ctx.res.clearCookie('access_token')
  return 'Logged out';
} 

}
