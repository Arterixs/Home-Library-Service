import { Track } from '../../tracks/entity/track';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TrackToFavs')
export class TrackToFavs {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  @OneToOne(() => Track, (track) => track.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  trackId: string;
}
