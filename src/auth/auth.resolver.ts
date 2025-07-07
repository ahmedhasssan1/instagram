import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { otpService } from './otp.service';
import { otpDto, resetPasswordDto } from './dto/otp.dto';
import { privateDecrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private readonly otpservice:otpService,
    private readonly userservice:UsersService
  ) {}

  @Mutation(()=>String)
  login(@Args('login')login:LoginDto){
    return this.authService.login(login)
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


}
