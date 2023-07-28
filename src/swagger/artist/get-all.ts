import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Artist } from 'src/modules/artists/artists.validation';

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
  );
}
