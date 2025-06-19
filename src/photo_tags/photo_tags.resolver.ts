import { Resolver } from '@nestjs/graphql';
import { PhotoTagsService } from './photo_tags.service';

@Resolver()
export class PhotoTagsResolver {
  constructor(private readonly photoTagsService: PhotoTagsService) {}
}
