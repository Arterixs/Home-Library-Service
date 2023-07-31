import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function PostAlbumFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add album to the favorites',
      description: 'Add album id to the favorites',
    }),
    ApiParam({
      name: 'albumId',
      format: 'uuid',
    }),
    ApiCreatedResponse({
      description: 'Added successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. albumId is invalid (not uuid)',
    }),
    ApiUnprocessableEntityResponse({
      description: "Album with id doesn't exist.",
    }),
  );
}
