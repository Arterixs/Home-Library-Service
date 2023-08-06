import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsDBService } from 'src/modules/albums/db/albums-db.service';
import { v4 as uuidv4 } from 'uuid';
import { TracksDBService } from 'src/modules/tracks/db/tracks-db.service';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';
import { ALBUM_NOT_FOUND } from 'src/constants/const';
import { Album } from './entity/album';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private readonly dataBase: AlbumsDBService,
    private readonly dataBaseTrack: TracksDBService,
    private readonly dataBaseFavs: FavoritesDBService,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
    // return this.dataBase.getAlbums();
  }

  getAlbumBuId(id: string) {
    this.checkAlbumId(id);
    return this.takeAlbum(id);
  }

  async setAlbum(album: CreateAlbumDto) {
    // const fullAlbum = this.createFullAlbum(album);
    // this.addAlbumInDB(fullAlbum);
    // return this.takeAlbum(fullAlbum.id);
    const albumEntity = this.albumRepository.create(album);
    return await this.albumRepository.save(albumEntity);
  }

  checkAlbumId(id: string) {
    const isAlbum = this.dataBase.checkAlbum(id);
    if (!isAlbum) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
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

  deleteAlbumByIdTrackDB(id: string) {
    this.dataBaseTrack.deleteAlbumById(id);
  }

  deleteAlbumFavs(id: string) {
    this.dataBaseFavs.deleteAlbum(id);
  }

  removeAlbum(id: string) {
    this.checkAlbumId(id);
    this.deleteAlbum(id);
    this.deleteAlbumByIdTrackDB(id);
    this.deleteAlbumFavs(id);
  }
}
