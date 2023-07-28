import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/modules/user/user.validation';

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
  );
}
