import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/user.validation';

export function PutUserDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Updates a users password by ID',
      description: 'Updates a users password by ID',
    }),
    ApiOkResponse({
      description: 'The user has been updated.',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. userId is invalid (not uuid)',
    }),
    ApiForbiddenResponse({
      description: 'oldPassword is wrong',
    }),
    ApiNotFoundResponse({
      description: 'User not found',
    }),
  );
}
