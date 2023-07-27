import { Global, Module } from '@nestjs/common';
import { UsersDBService } from '../user/users-db.service';
import { AlbumsDBService } from '../albums/albums-db.service';
import { ArtistsDBService } from '../artists/artists-db.service';
import { TracksDBService } from '../tracks/tracks-db.service';
import { FavoritesDBService } from 'src/favorites/favorites-db.service';

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
