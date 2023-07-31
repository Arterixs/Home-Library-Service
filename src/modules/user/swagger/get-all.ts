import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/modules/user/entity/user';

export function GetAllUsersDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Gets all users', description: 'Gets all users' }),
    ApiOkResponse({
      description: 'Successful operation',
      type: [User],
    }),
  );
}
