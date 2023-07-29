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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './user.validation';
import { USER_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteUserDescription,
  GetUserByIdDescription,
  PostUserDescription,
  PutUserDescription,
} from 'src/swagger/user';
import { GetAllUsersDescription } from 'src/swagger/get-all-user';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller(USER_PATH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetAllUsersDescription()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @GetUserByIdDescription()
  getUser(@Param('userId', ParseUUIDPipe) id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post()
  @PostUserDescription()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.setUser(user);
  }

  @Put(':userId')
  @PutUserDescription()
  changeUser(
    @Param('userId', ParseUUIDPipe) id: string,
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

  @Delete(':userId')
  @DeleteUserDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('userId', ParseUUIDPipe) id: string) {
    try {
      return this.userService.removeUser(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
