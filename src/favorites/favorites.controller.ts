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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavs(): FavoritesResponse {
    return this.favoritesService.getFavs();
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoritesService.addArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(err.message);
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.deleteArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
