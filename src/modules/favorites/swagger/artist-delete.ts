import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DeleteArtistFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete artist from favorites',
      description: 'Delete artist from favorites',
    }),
    ApiParam({
      name: 'artistId',
      format: 'uuid',
    }),
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Artist was not found.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
