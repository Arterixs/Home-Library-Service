import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/albums.validation';

export function GetAllAlbumsDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get albums list',
      description: 'Gets all library albums list',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: [Album],
    }),
  );
}
