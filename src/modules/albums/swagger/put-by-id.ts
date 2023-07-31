import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Album } from 'src/modules/albums/entity/album';

export function PutAlbumDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update album information',
      description: 'Update library album information by UUID',
    }),
    ApiParam({
      name: 'albumId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'The album has been updated.',
      type: Album,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. albumId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Album was not found.',
    }),
  );
}
