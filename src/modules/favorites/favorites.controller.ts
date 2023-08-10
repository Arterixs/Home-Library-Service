import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ALBUM_NOT_FOUND,
  ALBUM_PARAM,
  ALBUM_PATH,
  ARTIST_NOT_FOUND,
  ARTIST_PARAM,
  ARTIST_PATH,
  FAVS_PATH,
  TRACK_NOT_FOUND,
  TRACK_PARAM,
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
} from './swagger';

@ApiTags('Favs')
@Controller(FAVS_PATH)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @GetAllFavsDescription()
  async getFavs() {
    return await this.favoritesService.getFavs();
  }

  @Post(`${TRACK_PATH}/:${TRACK_PARAM}`)
  @PostTrackFavsDescription()
  async addTrack(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addTrack(id);
    if (result) return;
    throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete(`${TRACK_PATH}/:${TRACK_PARAM}`)
  @DeleteTrackFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.deleteTrack(id);
    if (result.affected) return result;
    throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post(`${ALBUM_PATH}/:${ALBUM_PARAM}`)
  @PostAlbumFavsDescription()
  async addAlbum(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addAlbum(id);
    if (result) return;
    throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete(`${ALBUM_PATH}/:${ALBUM_PARAM}`)
  @DeleteAlbumFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.deleteAlbum(id);
    if (result.affected) return result;
    throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post(`${ARTIST_PATH}/:${ARTIST_PARAM}`)
  @PostArtistFavsDescription()
  async addArtist(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addArtist(id);
    if (result) return;
    throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete(`${ARTIST_PATH}/:${ARTIST_PARAM}`)
  @DeleteArtistFavsDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.deleteArtist(id);
    if (result.affected) return result;
    throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
