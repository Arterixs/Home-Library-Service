import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AlbumsDBService } from './albums-db.service';

@Global()
@Module({
  providers: [DatabaseService, AlbumsDBService],
  exports: [DatabaseService, AlbumsDBService],
})
export class DatabaseModule {}
