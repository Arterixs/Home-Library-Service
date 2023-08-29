import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function PostArtistFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add artist to the favorites',
      description: 'Add artist id to the favorites',
    }),
    ApiParam({
      name: 'artistId',
      format: 'uuid',
    }),
    ApiCreatedResponse({
      description: 'Added successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiUnprocessableEntityResponse({
      description: "Artist with id doesn't exist",
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
