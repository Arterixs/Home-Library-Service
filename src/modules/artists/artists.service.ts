import { Injectable } from '@nestjs/common';
import { Artist } from './entity/artist';
import { CreateArtistDto } from './dto/create-artist';
import { UpdateArtistDto } from './dto/update-artist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getArtists() {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    return await this.artistRepository.findOne({
      where: { id },
    });
  }

  async setArtist(album: CreateArtistDto) {
    const fullAlbum = this.artistRepository.create(album);
    return await this.artistRepository.save(fullAlbum);
  }

  async checkArtistId(id: string) {
    return await this.artistRepository.exist({
      where: { id },
    });
  }

  async changeArtist(changeAlbum: UpdateArtistDto, id: string) {
    const resultChekId = await this.checkArtistId(id);
    if (!resultChekId) return resultChekId;
    const updateArtist = this.artistRepository.create(changeAlbum);
    await this.artistRepository.update({ id }, updateArtist);
    return await this.getArtistById(id);
  }

  async removeArtist(id: string) {
    return await this.artistRepository.delete(id);
  }
}
