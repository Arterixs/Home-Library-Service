import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksDBService } from 'src/modules/tracks/db/tracks-db.service';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';
import { TRACK_NOT_FOUND } from 'src/constants/const';
import { Track } from './entity/track';
import { CreateTrackDto } from './dto/create-track';
import { UpdateTrackDto } from './dto/update-track';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private usersRepository: Repository<Track>,
    private readonly dataBase: TracksDBService,
    private readonly dataBaseFavorites: FavoritesDBService,
  ) {}

  getTracks(): Track[] {
    return this.dataBase.getAll();
  }

  getTrackBuId(id: string) {
    this.checkTrack(id);
    return this.takeTrack(id);
  }

  setTrack(album: CreateTrackDto) {
    const fullAlbum = this.createFullTrack(album);
    this.addTrackInDB(fullAlbum);
    return this.takeTrack(fullAlbum.id);
  }

  checkTrack(id: string) {
    const isTrack = this.dataBase.checkTracks(id);
    if (!isTrack) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  takeTrack(id: string) {
    return this.dataBase.getById(id);
  }

  addTrackInDB(album: Track) {
    this.dataBase.create(album);
  }

  createFullTrack(album: CreateTrackDto) {
    return { ...album, id: uuidv4() };
  }

  updateTrack(nextAlbum: UpdateTrackDto, prevAlbum: Track) {
    return { ...prevAlbum, ...nextAlbum };
  }

  changeArtist(nextAlbum: UpdateTrackDto, id: string) {
    this.checkTrack(id);
    const prevAlbum = this.takeTrack(id);
    const updateAlbum = this.updateTrack(nextAlbum, prevAlbum);
    this.addTrackInDB(updateAlbum);
    return this.takeTrack(id);
  }

  deleteTrack(id: string) {
    this.dataBase.delete(id);
  }

  deleteTrackFavs(id: string) {
    this.dataBaseFavorites.deleteTrack(id);
  }

  removeTrack(id: string) {
    this.checkTrack(id);
    this.deleteTrack(id);
    this.deleteTrackFavs(id);
  }
}
