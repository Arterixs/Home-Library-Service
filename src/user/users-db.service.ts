import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.validation';

@Injectable()
export class UsersDBService {
  private users: Map<string, User> = new Map();

  getAll() {
    return Array.from(this.users.values());
  }

  delete(id: string) {
    this.users.delete(id);
  }

  create(user: User) {
    this.users.set(user.id, user);
  }

  getById(id: string) {
    return this.users.get(id);
  }

  checkUser(id: string) {
    return this.users.has(id);
  }
}
