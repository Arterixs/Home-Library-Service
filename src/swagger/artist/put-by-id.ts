import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/artists.validation';

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
      description: 'Artist was not found.',
    }),
  );
}
