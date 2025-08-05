import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getDatabase, Database } from 'firebase-admin/database';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: Database;

  onModuleInit() {
    const serviceAccount = JSON.parse(
      readFileSync(resolve(process.cwd(), './serviceAccountKey.json'), 'utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://instagram-486e8-default-rtdb.firebaseio.com',
    });

    this.db = getDatabase();
  }

  async writeExample(): Promise<void> {
    await this.db.ref('ahmed').set({ message: 'new user !'});
    await this.db.ref('test').set({ message: 'oma'});
    console.log('Data written successfully');
  }
}
