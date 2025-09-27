import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Posts } from '../entity/posts.entity';

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Posts])
  items: Posts[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => [Posts])
  allPosts: Posts[];
}
