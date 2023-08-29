import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: '56789' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
