import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/modules/user/user.validation';

export function GetAllDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Gets all users', description: 'Gets all users' }),
    ApiOkResponse({
      description: 'Successful operation',
      type: [User],
    }),
  );
}
