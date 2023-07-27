import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AlbumsDBService } from './albums-db.service';
import { ArtistsDBService } from './artists-db.service';
import { TracksDBService } from './tracks-db.service';

@Global()
@Module({
  providers: [
    DatabaseService,
    AlbumsDBService,
    ArtistsDBService,
    TracksDBService,
  ],
  exports: [
    DatabaseService,
    AlbumsDBService,
    ArtistsDBService,
    TracksDBService,
  ],
})
export class DatabaseModule {}
