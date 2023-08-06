import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Favorites } from 'src/modules/favorites/entityss/favorites';

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
  );
}
