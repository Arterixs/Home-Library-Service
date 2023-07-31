import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Track } from 'src/modules/tracks/entity/track';

export function GetAllTracksDescription() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get tracks list',
      description: 'Gets all library tracks list',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: [Track],
    }),
  );
}
