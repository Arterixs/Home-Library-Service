import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesDBService } from './favorites-db.service';
import { FavoritesResponse } from './favorites.validation';
import { TracksDBService } from 'src/modules/tracks/tracks-db.service';
import { AlbumsDBService } from 'src/modules/albums/albums-db.service';
import { ArtistsDBService } from 'src/modules/artists/artists-db.service';
import {
  ALBUM_FAVS_NOT_FOUND,
  ALBUM_NOT_FOUND,
  ARTIST_FAVS_NOT_FOUND,
  ARTIST_NOT_FOUND,
  TRACK_FAVS_NOT_FOUND,
  TRACK_NOT_FOUND,
} from 'src/constants/const';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly dataBase: FavoritesDBService,
    private readonly tracksService: TracksDBService,
    private readonly albumService: AlbumsDBService,
    private readonly artistService: ArtistsDBService,
  ) {}

  getFavs(): FavoritesResponse {
    const favorites = this.dataBase.getAll();
    const albums = favorites.albums.map((id) => this.getAlbumByIdInDB(id));
    const artists = favorites.artists.map((id) => this.getArtistByIdInDB(id));
    const tracks = favorites.tracks.map((id) => this.getTrackByIdInDB(id));
    return { albums, artists, tracks };
  }

  checkTrackInServTracks(id: string) {
    const isTrack = this.tracksService.checkTracks(id);
    if (!isTrack) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  checkTrackInFavs(id: string) {
    const isTrack = this.dataBase.checkTrack(id);
    if (!isTrack) {
      throw new HttpException(TRACK_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
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
    this.dataBase.addTrack(id);
  }

  checkAlbumInServAlbums(id: string) {
    const isAlbum = this.albumService.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  checkAlbumInFavs(id: string) {
    const isAlbum = this.dataBase.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException(ALBUM_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
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
    this.dataBase.addAlbum(id);
  }

  checkArtistInServArtists(id: string) {
    const isArtist = this.artistService.checkArtist(id);
    if (!isArtist) {
      throw new HttpException(
        ARTIST_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  checkArtistInFavs(id: string) {
    const isArtist = this.dataBase.checkArtist(id);
    if (!isArtist) {
      throw new HttpException(ARTIST_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
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
    this.dataBase.addArtist(id);
  }
}
