import { Global, Module } from '@nestjs/common';
import { UsersDBService } from '../user/db/users-db.service';
import { AlbumsDBService } from '../albums/db/albums-db.service';
import { ArtistsDBService } from '../artists/db/artists-db.service';
import { TracksDBService } from '../tracks/db/tracks-db.service';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';

@Global()
@Module({
  providers: [
    UsersDBService,
    AlbumsDBService,
    ArtistsDBService,
    TracksDBService,
    FavoritesDBService,
  ],
  exports: [
    UsersDBService,
    AlbumsDBService,
    ArtistsDBService,
    TracksDBService,
    FavoritesDBService,
  ],
})
export class DatabaseModule {}
