import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/entity/user';

export function PutUserDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Updates a users password by ID',
      description: 'Updates a users password by ID',
    }),
    ApiParam({
      name: 'userId',
      format: 'uuid',
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
    ApiBearerAuth('JWT-auth'),
  );
}
