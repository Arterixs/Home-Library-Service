import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PASSWORD_FORBIDDEN, USER_NOT_FOUND } from 'src/constants/const';
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
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async setUser(user: CreateUserDto) {
    const userEentity = this.usersRepository.create(user);
    return await this.usersRepository.save(userEentity);
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await this.usersRepository.findOne({
      where: { id },
    });
    if (result) {
      return result;
    }
    throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async removeUser(id: string) {
    return await this.usersRepository.delete(id);
  }

  checkUserById(id: string) {
    const isUser = this.usersRepository.find({
      where: { id },
    });
    if (!isUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async changeUserById(id: string, data: UpdateUserDto) {
    const { newPassword, oldPassword } = data;
    const { password } = await this.getUserById(id);
    this.checkPasswordUser(password, oldPassword);
    await this.usersRepository.update(id, {
      password: newPassword,
    });
    return this.getUserById(id);
  }

  checkPasswordUser(currentPassword: string, oldPassword: string) {
    const isEqualPassword = currentPassword === oldPassword;
    if (!isEqualPassword) {
      throw new HttpException(PASSWORD_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }
}
