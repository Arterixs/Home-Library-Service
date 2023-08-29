import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetTokens } from './token-type';

export function PostRefreshDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get updated token refresh and access',
      description: 'Get updated token refresh and access',
    }),
    ApiCreatedResponse({
      description: 'The tokens has been created',
      type: GetTokens,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiForbiddenResponse({
      description: 'Refresh token is invalid or expired',
    }),
  );
}
