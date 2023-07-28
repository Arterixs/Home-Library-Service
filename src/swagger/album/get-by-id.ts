import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Album } from 'src/modules/albums/albums.validation';

export function GetAlbumByIdDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single album by id',
      description: 'Gets single album by id',
    }),
    ApiParam({
      name: 'albumId',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Album,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. albumId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'Album was not found',
    }),
  );
}
