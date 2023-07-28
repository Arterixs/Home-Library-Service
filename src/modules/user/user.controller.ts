import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './user.validation';
import { USER_PATH } from 'src/constants/const';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(USER_PATH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.setUser(user);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  changeUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.changeUserById(id, updateUserDto);
    } catch (err) {
      if (err.status === HttpStatus.FORBIDDEN) {
        throw new ForbiddenException(err.message);
      }
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.userService.removeUser(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
