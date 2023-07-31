import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Uncle John' })
  login: string;
  @ApiProperty({ example: 1 })
  version: number;
  @ApiProperty({ example: 1655000000 })
  createdAt: number;
  @ApiProperty({ example: 1655000000 })
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
