import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/entity/user';

export function PostUserDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user', description: 'Creates a new user' }),
    ApiCreatedResponse({
      description: 'The user has been created.',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
