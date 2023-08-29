import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/entity/artist';

export function GetAllArtistDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all artists',
      description: 'Gets all artists',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: [Artist],
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
