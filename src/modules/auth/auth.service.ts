import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './dto/auth-refresh';
import { PayloadRefresh } from './types/interface';

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
    const userIdOrNull = await this.userService.checkUserInDb(user);
    if (!userIdOrNull) return userIdOrNull;
    const tokens = this.createdToken(userIdOrNull, user.login);
    return tokens;
  }

  createdToken(userId: string, login: string) {
    const payload = { userId, login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    return { accessToken, refreshToken };
  }

  async updateToken(token: RefreshToken) {
    const isValidToken = await this.checkRefreshToken(token.refreshToken);
    if (!isValidToken) return isValidToken;
    return this.createdToken(isValidToken.userId, isValidToken.login);
  }

  async checkRefreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<PayloadRefresh>(token, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      });
      return payload;
    } catch (err) {
      return null;
    }
  }
}
