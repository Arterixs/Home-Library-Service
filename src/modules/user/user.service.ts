import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersDBService } from 'src/modules/user/db/users-db.service';
import {
  INCREMENT_COUNT,
  PASSWORD_FORBIDDEN,
  USER_NOT_FOUND,
} from 'src/constants/const';
import { CreateUserDto } from './dto/create-dto';
import { User } from './entity/user';
import { UpdateUserDto } from './dto/update-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataBase: UsersDBService,
  ) {}

  async getUsers(): Promise<User[]> {
    const arg = await this.usersRepository.find();
    console.log(arg, 'Helllo');
    return arg;
    // return this.dataBase.getAll();
  }

  async setUser(user: CreateUserDto) {
    const fullUser = this.createUser(user);
    // this.dataBase.create(new User(fullUser));
    const createdUser = await this.usersRepository.create(new User(fullUser));
    return createdUser;
    return await this.usersRepository.save(createdUser);
    return this.takeUserById(fullUser.id);
  }

  takeUserById(id: string) {
    return this.dataBase.getById(id);
  }

  async getUserById(id: string): Promise<User | null> {
    // this.checkUserById(id);
    return await this.usersRepository.findOneBy({ id });
    // return this.takeUserById(id);
  }

  async removeUser(id: string) {
    // this.checkUserById(id);
    await this.usersRepository.delete(id);
    // this.dataBase.delete(id);
  }

  checkUserById(id: string) {
    const isUser = this.dataBase.checkUser(id);
    if (!isUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async changeUserById(id: string, data: UpdateUserDto) {
    this.checkUserById(id);
    const user = await this.getUserById(id);
    this.checkPasswordUser(user.password, data.oldPassword);
    const updateUser = this.changeUser(user, data.newPassword);
    this.dataBase.create(new User(updateUser));
    return await this.usersRepository.save(new User(updateUser));
    return this.takeUserById(updateUser.id);
  }

  changeUser(user: User, newPassword: string) {
    return {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + INCREMENT_COUNT,
    };
  }

  checkPasswordUser(currentPassword: string, oldPassword: string) {
    const isEqualPassword = currentPassword === oldPassword;
    if (!isEqualPassword) {
      throw new HttpException(PASSWORD_FORBIDDEN, HttpStatus.FORBIDDEN);
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
