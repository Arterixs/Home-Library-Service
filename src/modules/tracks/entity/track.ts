import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Track')
export class Track {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Toca Toca' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  artistId: string | null;

  @ApiProperty({ example: null, nullable: true })
  @Column({ type: 'text', nullable: true })
  albumId: string | null;

  @ApiProperty({ example: 160, description: 'In seconds' })
  @Column({ type: 'int' })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
