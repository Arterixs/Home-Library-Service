import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesDBService {
  private artists: Map<string, string> = new Map();
  private albums: Map<string, string> = new Map();
  private tracks: Map<string, string> = new Map();

  getAll() {
    return {
      artists: Array.from(this.artists.values()),
      albums: Array.from(this.albums.values()),
      tracks: Array.from(this.tracks.values()),
    };
  }

  addTrack(trackId: string) {
    this.tracks.set(trackId, trackId);
  }

  deleteTrack(trackId: string) {
    this.tracks.delete(trackId);
  }

  checkTrack(trackId: string) {
    return this.tracks.has(trackId);
  }

  addAlbum(albumId: string) {
    this.albums.set(albumId, albumId);
  }

  deleteAlbum(albumId: string) {
    this.albums.delete(albumId);
  }

  checkAlbum(albumId: string) {
    return this.albums.has(albumId);
  }

  addArtist(artistId: string) {
    this.artists.set(artistId, artistId);
  }

  deleteArtist(artistId: string) {
    this.artists.delete(artistId);
  }

  checkArtist(artistId: string) {
    return this.artists.has(artistId);
  }
}
