import { Album } from 'src/modules/albums/entity/album';
import { Artist } from 'src/modules/artists/entity/artist';
import { Track } from 'src/modules/tracks/entity/track';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
