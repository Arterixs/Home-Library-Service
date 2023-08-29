import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/entity/album';

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
    ApiBearerAuth('JWT-auth'),
  );
}
