// import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { otpService } from './otp.service';
import { resetPasswordDto } from './dto/otp.dto';
import { UsersService } from 'src/users/users.service';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { Response } from 'express';
import { RedisService } from 'src/redis/redis.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { boolean, object, string } from 'zod';
import { LoginResponseDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from './guradAuth/check_JWT';
import { ChangePasswordInput } from './dto/changePassword.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly otpservice: otpService,
    private readonly userservice: UsersService,
    private readonly redisservice: RedisService,
    private readonly jwtService: JwtService,
    @InjectQueue('main-queue') private emailQueue:Queue
  ) {}

  @Mutation(() => LoginResponseDto)
  @Public()
  async login(
    @Args('login') login: LoginDto,
    @Context() context: { req: Request; res: Response },
  ) {
    const result = await this.authService.login(login, context.res);
    return result;
  }

  @Mutation(() => String)
  sendOtp(@Args('email') email: string, @Args('name') name: string) {
    this.emailQueue.add('otp-process',{email,name})
    // return this.otpservice.requestOtp(email, name);
    return "otp proccess added to queue"

  }
  @Mutation(() => String)
  async verfication(@Args('otp') otp: resetPasswordDto) {
    await this.otpservice.verifyOtp(otp.email, otp.otp);
    const result = await this.userservice.newPassword(otp);

    if (!result) {
      throw new Error('newPassword returned null or undefined');
    }

    return result;
  }

  @Mutation(() => String)
  async logout(@Context() ctx: { res: Response; req: Request }) {
    const token = ctx.req.cookies?.access_token;
    return await this.authService.logout(token, ctx.res);
  }
  @Mutation(() => String)
  async changePassword(
    @Context() ctx: { res: Response; req: Request },
    @Args('changePasswordInput') changPasswordDto: ChangePasswordInput,
  ) {
    const token = ctx.req.cookies?.access_token;
    const verfitTok = await this.authService.verfiyToken(token);
    if (verfitTok.sub != changPasswordDto.userId) {
      throw new UnauthorizedException('can not access thisenpoint');
    }
    return await this.authService.changePassword(changPasswordDto);
  }
}
