// import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { otpService } from './otp.service';
import { otpDto, resetPasswordDto } from './dto/otp.dto';
import { privateDecrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { Resolver, Mutation, Args, Context, GraphQLExecutionContext } from '@nestjs/graphql'; // ✅ Import Context
import { Request } from 'express'; // ✅ Optional, if you want to type ctx.req
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private readonly otpservice:otpService,
    private readonly userservice:UsersService
  ) {}


 @Mutation(() => String)
  async login(
    @Args('login') login: LoginDto,
    @Context() context: {req:Request,res:Response},
  ): Promise<string> {
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
logout(@Context() ctx: { res: Response }) {
  ctx.res.clearCookie('access_token')
  return 'Logged out';
} 

}
