import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/entity/artist';

export function PutArtistDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update artist information',
      description: 'Update artist information by UUID',
    }),
    ApiParam({
      name: 'artistId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'The artist has been updated.',
      type: Artist,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Artist is not found.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
