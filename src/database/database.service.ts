import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.validation';

@Injectable()
export class DatabaseService {
  private users: Map<string, User> = new Map();

  getUsers() {
    return Array.from(this.users.values());
  }

  removeUser(id: string) {
    this.users.delete(id);
  }

  setUser(user: User) {
    this.users.set(user.id, user);
  }

  getUser(id: string) {
    return this.users.get(id);
  }

  checkUser(id: string) {
    return this.users.has(id);
  }
}
