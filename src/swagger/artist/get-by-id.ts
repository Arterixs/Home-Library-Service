import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/artists.validation';

export function GetArtistByIdDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single artist by id',
      description: 'Get single artist by id',
    }),
    ApiParam({
      name: 'artistId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
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
