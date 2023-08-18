import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AUTH_LOGIN,
  AUTH_PATH,
  AUTH_REFRESH,
  AUTH_SIGNUP,
} from 'src/constants/const';

@Controller(AUTH_PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_SIGNUP)
  createAuthUser() {
    return 'hello';
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
