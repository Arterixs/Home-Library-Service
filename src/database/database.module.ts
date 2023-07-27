import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AlbumsDBService } from './albums-db.service';
import { ArtistsDBService } from './artists-db.service';

@Global()
@Module({
  providers: [DatabaseService, AlbumsDBService, ArtistsDBService],
  exports: [DatabaseService, AlbumsDBService, ArtistsDBService],
})
export class DatabaseModule {}
