import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from './user.validation';
import { v4 as uuidv4 } from 'uuid';
import { UsersDBService } from 'src/user/users-db.service';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: UsersDBService) {}

  getUsers(): User[] {
    return this.dataBase.getAll();
  }

  setUser(user: CreateUserDto) {
    const fullUser = this.createUser(user);
    this.dataBase.create(new User(fullUser));
    return this.takeUserById(fullUser.id);
  }

  takeUserById(id: string) {
    return this.dataBase.getById(id);
  }

  getUserById(id: string) {
    this.checkUserById(id);
    return this.takeUserById(id);
  }

  removeUser(id: string) {
    this.checkUserById(id);
    this.dataBase.delete(id);
  }

  checkUserById(id: string) {
    const isUser = this.dataBase.checkUser(id);
    if (!isUser) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
  }

  changeUserById(id: string, data: UpdateUserDto) {
    this.checkUserById(id);
    const user = this.takeUserById(id);
    this.checkPasswordUser(user.password, data.oldPassword);
    const updateUser = this.changeUser(user, data.newPassword);
    this.dataBase.create(new User(updateUser));
    return this.takeUserById(updateUser.id);
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
