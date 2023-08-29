import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetTokens } from './token-type';

export function PostTokenDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get token access and refresh',
      description: 'Get token access and refresh',
    }),
    ApiCreatedResponse({
      description: 'The tokens has been created',
      type: GetTokens,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiForbiddenResponse({
      description: 'Password or Login user is wrong',
    }),
  );
}
