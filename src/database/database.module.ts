import { Module } from '@nestjs/common';
import { User } from 'src/user/user.interface';

@Module({})
export class DatabaseModule {
  private users: Map<string, User> = new Map();

  getUsers() {
    return this.users.values();
  }
}
