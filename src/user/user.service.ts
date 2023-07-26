import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserDto, User } from './user.validation';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: DatabaseModule) {}

  getUsers(): User[] {
    return this.dataBase.getUsers();
  }

  setUsers(user: CreateUserDto) {
    const fullUser = this.createUser(user);
    this.dataBase.setUser(new User(fullUser));
    return this.getUserById(fullUser.id);
  }

  getUserById(id: string) {
    this.checkUserById(id);
    return this.dataBase.getUser(id);
  }

  checkUserById(id: string) {
    const isUser = this.dataBase.checkUser(id);
    if (!isUser) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
  }

  createUser(user: CreateUserDto) {
    return {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }
}
