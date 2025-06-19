import { Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';

@Resolver()
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}
}
