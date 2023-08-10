import { Injectable } from '@nestjs/common';
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
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string) {
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
    return await this.getAlbumById(id);
  }

  async removeAlbum(id: string) {
    return await this.albumRepository.delete(id);
  }
}
