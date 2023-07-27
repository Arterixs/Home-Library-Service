import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistsDBService } from 'src/database/artists-db.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artists.validation';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly dataBase: ArtistsDBService) {}

  getArtists(): Artist[] {
    return this.dataBase.getAll();
  }

  getArtistBuId(id: string) {
    this.checkArtist(id);
    return this.takeArtist(id);
  }

  setArtist(album: CreateArtistDto) {
    const fullAlbum = this.createFullArtist(album);
    this.addAlbumInDB(fullAlbum);
    return this.takeArtist(fullAlbum.id);
  }

  checkArtist(id: string) {
    const isArtist = this.dataBase.checkArtist(id);
    if (!isArtist) {
      throw new HttpException('Artist is not exist', HttpStatus.NOT_FOUND);
    }
  }

  takeArtist(id: string) {
    return this.dataBase.getById(id);
  }

  addAlbumInDB(album: Artist) {
    this.dataBase.create(album);
  }

  createFullArtist(album: CreateArtistDto) {
    return { ...album, id: uuidv4() };
  }

  updateArtist(nextAlbum: UpdateArtistDto, prevAlbum: Artist) {
    return { ...prevAlbum, ...nextAlbum };
  }

  changeArtist(nextAlbum: UpdateArtistDto, id: string) {
    this.checkArtist(id);
    const prevAlbum = this.takeArtist(id);
    const updateAlbum = this.updateArtist(nextAlbum, prevAlbum);
    this.addAlbumInDB(updateAlbum);
    return this.takeArtist(id);
  }

  deleteArtist(id: string) {
    this.dataBase.delete(id);
  }

  removeAlbum(id: string) {
    this.checkArtist(id);
    this.deleteArtist(id);
  }
}
