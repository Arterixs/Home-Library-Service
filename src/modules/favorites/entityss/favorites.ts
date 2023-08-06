import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/albums/entity/album';
import { Artist } from 'src/modules/artists/entity/artist';
import { Track } from 'src/modules/tracks/entity/track';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
