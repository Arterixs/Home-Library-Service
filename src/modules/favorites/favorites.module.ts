import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumToFavs } from './entity/album-to-favs';
import { ArtistToFavs } from './entity/artist-to-favs';
import { TrackToFavs } from './entity/track-to-favs';
import { TracksService } from '../tracks/tracks.service';
import { Track } from '../tracks/entity/track';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { Album } from '../albums/entity/album';
import { Artist } from '../artists/entity/artist';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumToFavs,
      ArtistToFavs,
      TrackToFavs,
      Album,
      Artist,
      Track,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumsService, ArtistsService, TracksService],
})
export class FavoritesModule {}
