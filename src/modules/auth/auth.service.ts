import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async setUser(user: CreateUserDto) {
    return await this.userService.setUser(user);
  }

  async getTokens(user: CreateUserDto) {
    const checkUser = await this.userService.checkUserInDb(user);
    if (!checkUser.result) return checkUser;
  }
}
