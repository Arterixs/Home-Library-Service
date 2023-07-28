import { Album } from 'src/modules/albums/albums.validation';
import { Artist } from 'src/modules/artists/artists.validation';
import { Track } from 'src/modules/tracks/tracks.validation';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
