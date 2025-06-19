import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseResolver } from './firebase.resolver';

@Module({
  providers: [FirebaseResolver, FirebaseService],
})
export class FirebaseModule {}
