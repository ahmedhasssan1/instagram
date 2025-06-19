import { Resolver } from '@nestjs/graphql';
import { FirebaseService } from './firebase.service';

@Resolver()
export class FirebaseResolver {
  constructor(private readonly firebaseService: FirebaseService) {}
}
