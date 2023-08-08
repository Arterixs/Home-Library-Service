import { Injectable } from '@nestjs/common';
import { AlbumsDBService } from 'src/modules/albums/db/albums-db.service';
import { TracksDBService } from 'src/modules/tracks/db/tracks-db.service';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';
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
  }

  async getAlbumBuId(id: string) {
    return await this.albumRepository.findOne({
      where: { id },
    });
  }

  async setAlbum(album: CreateAlbumDto) {
    const albumEntity = this.albumRepository.create(album);
    return await this.albumRepository.save(albumEntity);
  }

  async checkAlbumId(id: string) {
    return await this.albumRepository.exist({
      where: { id },
    });
  }

  async changeAlbum(nextAlbum: UpdateAlbumDto, id: string) {
    const resultChekId = await this.checkAlbumId(id);
    if (!resultChekId) return resultChekId;
    const updateAlbum = this.albumRepository.create(nextAlbum);
    await this.albumRepository.update({ id }, updateAlbum);
    return await this.getAlbumBuId(id);
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

  async removeAlbum(id: string) {
    return await this.albumRepository.delete(id);
    // this.checkAlbumId(id);
    // this.deleteAlbum(id);
    // this.deleteAlbumByIdTrackDB(id);
    // this.deleteAlbumFavs(id);
  }
}
