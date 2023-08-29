import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../../artists/entity/artist';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Album')
export class Album {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'White Spider' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 2013 })
  @Column({ type: 'int' })
  year: number;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  @ManyToOne(() => Artist, (artist) => artist.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
