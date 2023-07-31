import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DeleteUserDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
      description: 'Delete user by ID',
    }),
    ApiParam({
      name: 'userId',
      format: 'uuid',
    }),
    ApiNoContentResponse({
      description: 'The user has been deleted',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. userId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'User not found',
    }),
  );
}
