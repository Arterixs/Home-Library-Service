import { Injectable } from '@nestjs/common';
import { Album } from 'src/modules/albums/albums.validation';
import { Artist } from 'src/modules/artists/artists.validation';
import { Track } from 'src/modules/tracks/tracks.validation';

@Injectable()
export class FavoritesDBService {
  private artists: Map<string, Artist> = new Map();
  private albums: Map<string, Album> = new Map();
  private tracks: Map<string, Track> = new Map();

  getAll() {
    return {
      artists: Array.from(this.artists.values()),
      albums: Array.from(this.albums.values()),
      tracks: Array.from(this.tracks.values()),
    };
  }

  addTrack(track: Track) {
    this.tracks.set(track.id, track);
  }

  deleteTrack(id: string) {
    this.tracks.delete(id);
  }

  checkTrack(id: string) {
    return this.tracks.has(id);
  }

  addAlbum(album: Album) {
    this.albums.set(album.id, album);
  }

  deleteAlbum(id: string) {
    this.albums.delete(id);
  }

  checkAlbum(id: string) {
    return this.albums.has(id);
  }

  addArtist(artist: Artist) {
    this.artists.set(artist.id, artist);
  }

  deleteArtist(id: string) {
    this.artists.delete(id);
  }

  checkArtist(id: string) {
    return this.artists.has(id);
  }
}
