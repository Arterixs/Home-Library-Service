import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/entity/album';
import { Artist } from 'src/modules/artists/entity/artist';
import { Track } from 'src/modules/tracks/entity/track';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: string[];

  @ApiProperty({ type: [Album] })
  albums: string[];

  @ApiProperty({ type: [Track] })
  tracks: string[];
}
