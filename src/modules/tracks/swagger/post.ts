import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Track } from 'src/modules/tracks/entity/track';

export function PostTrackDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add new track',
      description: 'Add new track information',
    }),
    ApiCreatedResponse({
      description: 'Successful operation.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
