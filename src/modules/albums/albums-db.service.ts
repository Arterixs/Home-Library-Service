import { Injectable } from '@nestjs/common';
import { Album } from 'src/modules/albums/albums.validation';

@Injectable()
export class AlbumsDBService {
  private albums: Map<string, Album> = new Map();

  getAlbums() {
    return Array.from(this.albums.values());
  }

  removeAlbum(id: string) {
    this.albums.delete(id);
  }

  setAlbum(album: Album) {
    this.albums.set(album.id, album);
  }

  getAlbum(id: string) {
    return this.albums.get(id);
  }

  checkAlbum(id: string) {
    return this.albums.has(id);
  }

  deleteArtistById(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
