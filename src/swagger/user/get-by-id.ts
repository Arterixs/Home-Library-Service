import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/entity/user';

export function GetUserByIdDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by id',
      description: 'Get single user by id',
    }),
    ApiParam({
      name: 'userId',
      format: 'uuid',
    }),
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
  );
}
