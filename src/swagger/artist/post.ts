import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/artists.validation';

export function PostArtistDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Add new artist', description: 'Add new artist' }),
    ApiCreatedResponse({
      description: 'The user has been created.',
      type: Artist,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
  );
}
