import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DeleteAlbumFavsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete album from favorites',
      description: 'Delete album from favorites',
    }),
    ApiParam({
      name: 'albumId',
      format: 'uuid',
    }),
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. albumId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Album was not found.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
