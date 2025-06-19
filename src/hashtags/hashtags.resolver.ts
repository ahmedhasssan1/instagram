import { Resolver } from '@nestjs/graphql';
import { HashtagsService } from './hashtags.service';

@Resolver()
export class HashtagsResolver {
  constructor(private readonly hashtagsService: HashtagsService) {}
}
