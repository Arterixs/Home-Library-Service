import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/user.validation';

export function GetUserByIdDescription() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Successful operation.',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. userId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'User not found',
    }),
    ApiOperation({
      summary: 'Get user by id',
      description: 'Get single user by id',
    }),
  );
}
