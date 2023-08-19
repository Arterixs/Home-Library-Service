import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async setUser(user: CreateUserDto) {
    return await this.userService.setUser(user);
  }

  async getTokens(user: CreateUserDto) {
    const checkUser = await this.userService.checkUserInDb(user);
    if (!checkUser.result) return checkUser;
    const payload = { login: checkUser.userId, username: user.login };
    checkUser.access = this.jwtService.sign(payload);
    checkUser.refresh = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    return checkUser;
  }
}
