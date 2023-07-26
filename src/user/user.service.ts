import { Injectable } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: DatabaseModule) {}

  getUsers(): IterableIterator<User> {
    return this.dataBase.getUsers();
  }
}
