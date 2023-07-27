import { Album } from 'src/albums/albums.validation';
import { Artist } from 'src/artists/artists.validation';
import { Track } from 'src/tracks/tracks.validation';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
