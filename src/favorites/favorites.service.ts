import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesDBService } from './favorites-db.service';
import { FavoritesResponse } from './favorites.validation';
import { TracksDBService } from 'src/tracks/tracks-db.service';
import { AlbumsDBService } from 'src/albums/albums-db.service';
import { ArtistsDBService } from 'src/artists/artists-db.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly dataBase: FavoritesDBService,
    private readonly tracksService: TracksDBService,
    private readonly albumService: AlbumsDBService,
    private readonly artistService: ArtistsDBService,
  ) {}
  getFavs(): FavoritesResponse {
    return this.dataBase.getAll();
  }

  checkTrackInServTracks(id: string) {
    const isTrack = this.tracksService.checkTracks(id);
    if (!isTrack) {
      throw new HttpException(
        'Tracks is not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  checkTrackInFavs(id: string) {
    const isTrack = this.dataBase.checkTrack(id);
    if (!isTrack) {
      throw new HttpException(
        'Tracks is not exist in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getTrackByIdInDB(id: string) {
    return this.tracksService.getById(id);
  }

  deleteTrack(id: string) {
    this.checkTrackInFavs(id);
    this.dataBase.deleteTrack(id);
  }

  addTrack(id: string) {
    this.checkTrackInServTracks(id);
    const track = this.getTrackByIdInDB(id);
    this.dataBase.addTrack(track);
  }

  checkAlbumInServAlbums(id: string) {
    const isAlbum = this.albumService.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException(
        'Album is not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  checkAlbumInFavs(id: string) {
    const isAlbum = this.dataBase.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException(
        'Tracks is not exist in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getAlbumByIdInDB(id: string) {
    return this.albumService.getAlbum(id);
  }

  deleteAlbum(id: string) {
    this.checkAlbumInFavs(id);
    this.dataBase.deleteAlbum(id);
  }

  addAlbum(id: string) {
    this.checkAlbumInServAlbums(id);
    const album = this.getAlbumByIdInDB(id);
    this.dataBase.addAlbum(album);
  }

  checkArtistInServArtists(id: string) {
    const isArtist = this.artistService.checkArtist(id);
    if (!isArtist) {
      throw new HttpException(
        'Album is not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  checkArtistInFavs(id: string) {
    const isArtist = this.dataBase.checkArtist(id);
    if (!isArtist) {
      throw new HttpException(
        'Tracks is not exist in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getArtistByIdInDB(id: string) {
    return this.artistService.getById(id);
  }

  deleteArtist(id: string) {
    this.checkArtistInFavs(id);
    this.dataBase.deleteArtist(id);
  }

  addArtist(id: string) {
    this.checkArtistInServArtists(id);
    const artist = this.getArtistByIdInDB(id);
    this.dataBase.addArtist(artist);
  }
}
