import { Album } from '../../albums/entity/album';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('AlbumToFavs')
export class AlbumToFavs {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  @OneToOne(() => Album, (album) => album.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: string;
}
