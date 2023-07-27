import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsDBService } from 'src/database/albums-db.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './albums.validation';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private readonly dataBase: AlbumsDBService) {}

  getAlbums(): Album[] {
    return this.dataBase.getAlbums();
  }

  getAlbumBuId(id: string) {
    this.checkAlbumId(id);
    return this.takeAlbum(id);
  }

  setAlbum(album: CreateAlbumDto) {
    const fullAlbum = this.createFullAlbum(album);
    this.addAlbumInDB(fullAlbum);
    return this.takeAlbum(fullAlbum.id);
  }

  checkAlbumId(id: string) {
    const isAlbum = this.dataBase.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException('Album is not exist', HttpStatus.NOT_FOUND);
    }
  }

  takeAlbum(id: string) {
    return this.dataBase.getAlbum(id);
  }

  addAlbumInDB(album: Album) {
    this.dataBase.setAlbum(album);
  }

  createFullAlbum(album: CreateAlbumDto) {
    return { ...album, id: uuidv4() };
  }

  updateAlbum(nextAlbum: UpdateAlbumDto, prevAlbum: Album) {
    return { ...prevAlbum, ...nextAlbum };
  }

  changeAlbum(nextAlbum: UpdateAlbumDto, id: string) {
    this.checkAlbumId(id);
    const prevAlbum = this.takeAlbum(id);
    const updateAlbum = this.updateAlbum(nextAlbum, prevAlbum);
    this.addAlbumInDB(updateAlbum);
    return this.takeAlbum(id);
  }

  deleteAlbum(id: string) {
    this.dataBase.removeAlbum(id);
  }

  removeAlbum(id: string) {
    this.checkAlbumId(id);
    this.deleteAlbum(id);
  }
}
