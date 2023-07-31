import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'JoJo' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
