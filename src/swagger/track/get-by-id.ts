import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Track } from 'src/modules/tracks/entity/track';

export function GetTrackByIdDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single track by id',
      description: 'Get single track by id',
    }),
    ApiParam({
      name: 'trackId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. trackId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Track was not found.',
    }),
  );
}
