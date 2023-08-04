import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { USER_NOT_FOUND, USER_PARAM, USER_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-dto';
import {
  DeleteUserDescription,
  GetAllUsersDescription,
  GetUserByIdDescription,
  PostUserDescription,
  PutUserDescription,
} from './swagger';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller(USER_PATH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetAllUsersDescription()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(`:${USER_PARAM}`)
  @GetUserByIdDescription()
  async getUser(@Param(USER_PARAM, ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @PostUserDescription()
  createUser(@Body() user: CreateUserDto): Promise<void | User> {
    return this.userService.setUser(user);
  }

  @Put(`:${USER_PARAM}`)
  @PutUserDescription()
  async changeUser(
    @Param(USER_PARAM, ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const result = await this.userService.changeUserById(id, updateUserDto);
      return result;
    } catch (err) {
      if (err.status === HttpStatus.FORBIDDEN) {
        throw new ForbiddenException(err.message);
      }
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Delete(`:${USER_PARAM}`)
  @DeleteUserDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param(USER_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.userService.removeUser(id);
    if (!result.affected) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
