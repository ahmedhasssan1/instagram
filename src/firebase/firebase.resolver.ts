import { Resolver, Mutation } from '@nestjs/graphql';
import { FirebaseService } from './firebase.service';
import { strict } from 'assert';
import { string } from 'zod';

@Resolver()
export class FirebaseResolver {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Mutation(() => Boolean)
  async writeToFirebase(): Promise<boolean> {
    await this.firebaseService.writeExample();
    return true;
  }
}
