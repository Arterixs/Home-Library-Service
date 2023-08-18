import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AUTH_LOGIN,
  AUTH_PATH,
  AUTH_REFRESH,
  AUTH_SIGNUP,
} from 'src/constants/const';
import { CreateUserDto } from '../user/dto/create-dto';
import { ApiTags } from '@nestjs/swagger';
import { PostUserDescription } from '../user/swagger';

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
  getTokens() {
    return 'hello';
  }

  @Post(AUTH_REFRESH)
  updateToken() {
    return 'hello';
  }
}
