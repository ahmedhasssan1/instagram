import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { otpService } from './otp.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private readonly otpservice:otpService
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


}
