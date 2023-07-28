import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Album } from 'src/modules/albums/albums.validation';

export function PostAlbumDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add new album',
      description: 'Add new album information',
    }),
    ApiCreatedResponse({
      description: 'Album is created',
      type: Album,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
  );
}
