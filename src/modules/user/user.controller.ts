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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller(USER_PATH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Gets all users', description: 'Gets all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [User],
  })
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @ApiOkResponse({
    description: 'Successful operation.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get single user by id',
  })
  getUser(@Param('userId', ParseUUIDPipe) id: string) {
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
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.setUser(user);
  }

  @UsePipes(new ValidationPipe())
  @Put(':userId')
  @ApiOperation({
    summary: 'Updates a users password by ID',
    description: 'Updates a users password by ID',
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
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
  @ApiOperation({ summary: 'Deletes user', description: 'Deletes user by ID' })
  @ApiNoContentResponse({
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
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
