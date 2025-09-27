import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserInput } from './dto/regester.dto';
import { Public } from 'src/auth/guradAuth/check_JWT';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => String)
  hello(): string {
    return 'Hello, GraphQL!';
  }



  @Query(() => Users)
  findUser(@Args('userId', { type: () => Int }) userid: number) {
    return this.usersService.findOneUser(userid);
  }
  @Query(() => Users)
  async findUserByEmail(@Args('email') email: string) {
    return await this.usersService.findUserByEmail(email);
  }
}
