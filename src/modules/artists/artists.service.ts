import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistsDBService } from 'src/modules/artists/db/artists-db.service';
import { v4 as uuidv4 } from 'uuid';
import { AlbumsDBService } from 'src/modules/albums/db/albums-db.service';
import { TracksDBService } from 'src/modules/tracks/db/tracks-db.service';
import { FavoritesDBService } from 'src/modules/favorites/db/favorites-db.service';
import { ARTIST_NOT_FOUND } from 'src/constants/const';
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
    private readonly dataBase: ArtistsDBService,
    private readonly dataBaseAlbum: AlbumsDBService,
    private readonly dataBaseTrack: TracksDBService,
    private readonly dataBaseFavs: FavoritesDBService,
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

  async checkArtist(id: string) {
    return await this.artistRepository.exist({
      where: { id },
    });
  }

  async changeArtist(changeAlbum: UpdateArtistDto, id: string) {
    const resultChekId = await this.checkArtist(id);
    if (!resultChekId) return resultChekId;
    const updateArtist = this.artistRepository.create(changeAlbum);
    await this.artistRepository.update({ id }, updateArtist);
    return await this.getArtistById(id);
  }

  async removeArtist(id: string) {
    return await this.artistRepository.delete(id);
    // this.checkArtist(id);
    // this.deleteArtist(id);
    // this.deleteArtistByIdAlbumDB(id);
    // this.deleteArtistByIdTrackDB(id);
    // this.deleteArtistByIdFavsDB(id);
  }

  deleteArtistByIdAlbumDB(id: string) {
    this.dataBaseAlbum.deleteArtistById(id);
  }

  deleteArtistByIdTrackDB(id: string) {
    this.dataBaseTrack.deleteArtistById(id);
  }

  deleteArtistByIdFavsDB(id: string) {
    this.dataBaseFavs.deleteArtist(id);
  }
}
