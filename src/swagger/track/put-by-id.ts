import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Track } from 'src/modules/tracks/tracks.validation';

export function PutTrackDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update track information',
      description: 'Update library track information by UUID',
    }),
    ApiParam({
      name: 'trackId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'The track has been updated.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. trackId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Track was not found',
    }),
  );
}
