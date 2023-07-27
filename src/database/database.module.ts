import { Global, Module } from '@nestjs/common';
import { UsersDBService } from '../user/users-db.service';
import { AlbumsDBService } from '../albums/albums-db.service';
import { ArtistsDBService } from '../artists/artists-db.service';
import { TracksDBService } from '../tracks/tracks-db.service';

@Global()
@Module({
  providers: [
    UsersDBService,
    AlbumsDBService,
    ArtistsDBService,
    TracksDBService,
  ],
  exports: [UsersDBService, AlbumsDBService, ArtistsDBService, TracksDBService],
})
export class DatabaseModule {}
