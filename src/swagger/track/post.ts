import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Track } from 'src/modules/tracks/tracks.validation';

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
  );
}
