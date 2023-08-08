import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/entity/album';
import { Artist } from 'src/modules/artists/entity/artist';
import { Track } from 'src/modules/tracks/entity/track';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artistId: string[];

  @ApiProperty({ type: [Album] })
  albumId: string[];

  @ApiProperty({ type: [Track] })
  trackId: string[];
}
