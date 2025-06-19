import { Resolver } from '@nestjs/graphql';
import { HashtagesPostsService } from './hashtages_posts.service';

@Resolver()
export class HashtagesPostsResolver {
  constructor(private readonly hashtagesPostsService: HashtagesPostsService) {}
}
