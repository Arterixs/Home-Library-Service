import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Favorites } from './favorites';

export function GetAllFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all favorites',
      description: 'Gets all favorites artists, tracks and albums',
    }),
    ApiCreatedResponse({
      description: 'Successful operation',
      type: Favorites,
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
