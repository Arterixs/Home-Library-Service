import { Injectable } from '@nestjs/common';
import { Artist } from 'src/modules/artists/artists.validation';

@Injectable()
export class ArtistsDBService {
  private artists: Map<string, Artist> = new Map();

  getAll() {
    return Array.from(this.artists.values());
  }

  delete(id: string) {
    this.artists.delete(id);
  }

  create(album: Artist) {
    this.artists.set(album.id, album);
  }

  getById(id: string) {
    return this.artists.get(id);
  }

  checkArtist(id: string) {
    return this.artists.has(id);
  }
}
