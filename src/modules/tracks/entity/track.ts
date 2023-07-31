import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Toca Toca' })
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({ example: null, nullable: true })
  albumId: string | null;

  @ApiProperty({ example: 160, description: 'In seconds' })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
