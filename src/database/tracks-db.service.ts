import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/tracks.validation';

@Injectable()
export class TracksDBService {
  private tracks: Map<string, Track> = new Map();

  getAll() {
    return Array.from(this.tracks.values());
  }

  delete(id: string) {
    this.tracks.delete(id);
  }

  create(album: Track) {
    this.tracks.set(album.id, album);
  }

  getById(id: string) {
    return this.tracks.get(id);
  }

  checkTracks(id: string) {
    return this.tracks.has(id);
  }
}
