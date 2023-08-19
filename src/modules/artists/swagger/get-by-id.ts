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
      description: 'Artist is not found.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
