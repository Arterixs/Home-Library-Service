import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DeleteTrackFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete track from favorites',
      description: 'Delete track from favorites',
    }),
    ApiParam({
      name: 'trackId',
      format: 'uuid',
    }),
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. trackId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Track was not found.',
    }),
  );
}
