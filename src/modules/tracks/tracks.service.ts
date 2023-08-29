import { Injectable } from '@nestjs/common';
import { Track } from './entity/track';
import { CreateTrackDto } from './dto/create-track';
import { UpdateTrackDto } from './dto/update-track';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async getTracks() {
    return this.tracksRepository.find();
  }

  async getTrackById(id: string) {
    return await this.tracksRepository.findOne({
      where: { id },
    });
  }

  async setTrack(track: CreateTrackDto) {
    const updateTrack = this.tracksRepository.create(track);
    return await this.tracksRepository.save(updateTrack);
  }

  async checkTrackId(id: string) {
    return await this.tracksRepository.exist({
      where: { id },
    });
  }

  async changeTrack(updateTrack: UpdateTrackDto, id: string) {
    const resultChekId = await this.checkTrackId(id);
    if (!resultChekId) return resultChekId;
    const updateAlbum = this.tracksRepository.create(updateTrack);
    await this.tracksRepository.update({ id }, updateAlbum);
    return await this.getTrackById(id);
  }

  async removeTrack(id: string) {
    return await this.tracksRepository.delete(id);
  }
}
