import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AUTH_FORBIDDEN,
  AUTH_LOGIN,
  AUTH_PATH,
  AUTH_REFRESH,
  AUTH_SIGNUP,
  REFRESH_FORBIDDEN,
} from 'src/constants/const';
import { CreateUserDto } from '../user/dto/create-dto';
import { ApiTags } from '@nestjs/swagger';
import { PostUserDescription } from '../user/swagger';
import { PostTokenDescription } from './swagger/post-login';
import { Public } from './auth.decorator';
import { RefreshToken } from './dto/auth-refresh';
import { PostRefreshDescription } from './swagger/post-refresh';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller(AUTH_PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_SIGNUP)
  @Public()
  @PostUserDescription()
  createAuthUser(@Body() user: CreateUserDto) {
    return this.authService.setUser(user);
  }

  @Post(AUTH_LOGIN)
  @Public()
  @PostTokenDescription()
  async getTokens(@Body() user: CreateUserDto) {
    const result = await this.authService.getTokens(user);
    if (result) return result;
    throw new HttpException(AUTH_FORBIDDEN, HttpStatus.FORBIDDEN);
  }

  @Post(AUTH_REFRESH)
  @PostRefreshDescription()
  async updateToken(@Body() token: RefreshToken) {
    const result = await this.authService.updateToken(token);
    if (!result) {
      throw new HttpException(REFRESH_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return result;
  }
}
