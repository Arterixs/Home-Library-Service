import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../albums/entity/album';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entity/artist';

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
  @OneToOne(() => Artist, (artist) => artist.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string | null;

  @ApiProperty({ example: null, nullable: true })
  @Column({ type: 'text', nullable: true })
  @OneToOne(() => Album, (album) => album.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: string | null;

  @ApiProperty({ example: 160, description: 'In seconds' })
  @Column({ type: 'int' })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
