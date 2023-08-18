import bcrypt = require('bcryptjs');
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-dto';
import { User } from './entity/user';
import { UpdateUserDto } from './dto/update-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { saltRounds } from 'src/constants/const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async setUser(user: CreateUserDto) {
    const hash = this.createHashPassword(user.password);
    user.password = hash;
    const userEentity = this.usersRepository.create(user);
    return await this.usersRepository.save(userEentity);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async changeUserById(id: string, data: UpdateUserDto) {
    const { newPassword, oldPassword } = data;
    const user = await this.getUserById(id);
    if (!user) return user;
    const checkPassword = this.checkPasswordUser(user.password, oldPassword);
    if (!checkPassword) return checkPassword;
    await this.usersRepository.update(id, {
      password: this.createHashPassword(newPassword),
    });
    return this.getUserById(id);
  }

  checkPasswordUser(currentPassword: string, oldPassword: string) {
    return bcrypt.compareSync(oldPassword, currentPassword);
  }

  async removeUser(id: string) {
    return await this.usersRepository.delete(id);
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository.findOne({
      where: { login },
    });
  }

  async checkUserInDb(user: CreateUserDto) {
    const userDb = await this.getUserByLogin(user.login);
    if (!userDb) return { result: false, login: false, password: false };

    const checkPassword = this.checkPasswordUser(
      userDb.password,
      user.password,
    );
    if (!checkPassword) return { result: false, login: true, password: false };
    return { result: true, login: true, password: true };
  }

  createHashPassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
  }
}
