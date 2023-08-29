import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function PostTrackFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add track to the favorites',
      description: 'Add track id to the favorites',
    }),
    ApiParam({
      name: 'trackId',
      format: 'uuid',
    }),
    ApiCreatedResponse({
      description: 'Added successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. trackId is invalid (not uuid)',
    }),
    ApiUnprocessableEntityResponse({
      description: "Track with id doesn't exist.",
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
