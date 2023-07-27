import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from './user.validation';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: DatabaseService) {}

  getUsers(): User[] {
    return this.dataBase.getUsers();
  }

  setUser(user: CreateUserDto) {
    const fullUser = this.createUser(user);
    this.dataBase.setUser(new User(fullUser));
    return this.getUserById(fullUser.id);
  }

  getUserById(id: string) {
    this.checkUserById(id);
    return this.dataBase.getUser(id);
  }

  removeUser(id: string) {
    this.checkUserById(id);
    this.dataBase.removeUser(id);
  }

  checkUserById(id: string) {
    const isUser = this.dataBase.checkUser(id);
    if (!isUser) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
  }

  changeUserById(id: string, data: UpdateUserDto) {
    const user = this.getUserById(id);
    this.checkPasswordUser(user.password, data.oldPassword);
    const updateUser = this.changeUser(user, data.newPassword);
    this.dataBase.setUser(new User(updateUser));
    return this.getUserById(updateUser.id);
  }

  changeUser(user: User, newPassword: string) {
    return {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
  }

  checkPasswordUser(currentPassword: string, oldPassword: string) {
    const isEqualPassword = currentPassword === oldPassword;
    if (!isEqualPassword) {
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.FORBIDDEN,
      );
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
