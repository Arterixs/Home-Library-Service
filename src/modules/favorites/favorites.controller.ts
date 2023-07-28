import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.validation';
import {
  ALBUM_PATH,
  ARTIST_PATH,
  FAVS_PATH,
  TRACK_PATH,
} from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteAlbumFavsDescription,
  DeleteArtistFavsDescription,
  DeleteTrackFavsDescription,
  GetAllFavsDescription,
  PostAlbumFavsDescription,
  PostArtistFavsDescription,
  PostTrackFavsDescription,
} from 'src/swagger/favorites';

@ApiTags('Favs')
@Controller(FAVS_PATH)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @GetAllFavsDescription()
  getFavs(): FavoritesResponse {
    return this.favoritesService.getFavs();
  }

  @Post(`${TRACK_PATH}/:trackId`)
  @PostTrackFavsDescription()
  addTrack(@Param('trackId', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete(`${TRACK_PATH}/:trackId`)
  @DeleteTrackFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('trackId', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post(`${ALBUM_PATH}/:albumId`)
  @PostAlbumFavsDescription()
  addAlbum(@Param('albumId', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete(`${ALBUM_PATH}/:albumId`)
  @DeleteAlbumFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('albumId', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post(`${ARTIST_PATH}/:artistId`)
  @PostArtistFavsDescription()
  addArtist(@Param('artistId', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete(`${ARTIST_PATH}/:artistId`)
  @DeleteArtistFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('artistId', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
