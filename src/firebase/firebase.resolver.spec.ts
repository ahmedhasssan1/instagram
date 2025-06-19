import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseResolver } from './firebase.resolver';
import { FirebaseService } from './firebase.service';

describe('FirebaseResolver', () => {
  let resolver: FirebaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseResolver, FirebaseService],
    }).compile();

    resolver = module.get<FirebaseResolver>(FirebaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
