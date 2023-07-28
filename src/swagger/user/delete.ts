import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteUserDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deletes user',
      description: 'Deletes user by ID',
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
