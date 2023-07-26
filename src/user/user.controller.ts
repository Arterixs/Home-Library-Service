import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): IterableIterator<User> {
    return this.userService.getUsers();
  }

  @Post()
  createUser() {
    console.log('ere');
  }
}
