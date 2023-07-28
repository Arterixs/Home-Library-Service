import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/albums.validation';
import { Artist } from 'src/modules/artists/artists.validation';
import { Track } from 'src/modules/tracks/tracks.validation';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
