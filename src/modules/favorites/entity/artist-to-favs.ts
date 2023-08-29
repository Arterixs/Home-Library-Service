import { Artist } from '../../artists/entity/artist';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ArtistToFavs')
export class ArtistToFavs {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  @OneToOne(() => Artist, (artist) => artist.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string;
}
