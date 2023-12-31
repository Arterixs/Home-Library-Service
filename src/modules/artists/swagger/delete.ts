import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DeleteArtistDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete artist',
      description: 'Delete artist from library',
    }),
    ApiParam({
      name: 'artistId',
      format: 'uuid',
    }),
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Artist is not found.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
