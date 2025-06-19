import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
   @Query(() => String)
  hello(): string {
    return 'Hello, GraphQL!';
  }
  @Mutation(()=>Users)
  async createUser(@Args('createUser') createUser:CreateUserDto):Promise<Users>{
    return this.usersService.createUser(createUser)
  }
  @Query(()=>Users)
  findUser(@Args('userId',{type:()=>Int}) userid:number){
    return this.usersService.findOneUser(userid)
  }
}
