import { Global, Module } from '@nestjs/common';
import { UsersDBService } from '../user/db/users-db.service';
import { AlbumsDBService } from '../albums/db/albums-db.service';
import { ArtistsDBService } from '../artists/db/artists-db.service';
import { TracksDBService } from '../tracks/db/tracks-db.service';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entity/user';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        port: config.get('POSTGRES_PORT'),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
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
