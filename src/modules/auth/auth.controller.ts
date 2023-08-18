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
  AUTH_LOGIN,
  AUTH_LOGIN_FORBIDDEN,
  AUTH_PASSWORD_FORBIDDEN,
  AUTH_PATH,
  AUTH_REFRESH,
  AUTH_SIGNUP,
} from 'src/constants/const';
import { CreateUserDto } from '../user/dto/create-dto';
import { ApiTags } from '@nestjs/swagger';
import { PostUserDescription } from '../user/swagger';
import { PostTokenDescription } from './swagger/post-login';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller(AUTH_PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_SIGNUP)
  @PostUserDescription()
  createAuthUser(@Body() user: CreateUserDto) {
    return this.authService.setUser(user);
  }

  @Post(AUTH_LOGIN)
  @PostTokenDescription()
  async getTokens(@Body() user: CreateUserDto) {
    const result = await this.authService.getTokens(user);

    if (result.result) return true;

    if (!result.login) {
      throw new HttpException(AUTH_LOGIN_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    if (!result.password) {
      throw new HttpException(AUTH_PASSWORD_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }

  @Post(AUTH_REFRESH)
  updateToken() {
    return 'hello';
  }
}
