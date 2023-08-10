import { Injectable } from '@nestjs/common';
import { AlbumToFavs } from './entity/album-to-favs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistToFavs } from './entity/artist-to-favs';
import { TrackToFavs } from './entity/track-to-favs';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(AlbumToFavs)
    private albumFavsRepository: Repository<AlbumToFavs>,
    @InjectRepository(ArtistToFavs)
    private artistFavsRepository: Repository<ArtistToFavs>,
    @InjectRepository(TrackToFavs)
    private trackFavsRepository: Repository<TrackToFavs>,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  async getFavs() {
    const albumIds = await this.albumFavsRepository.find();
    const artistIds = await this.artistFavsRepository.find();
    const trackIds = await this.trackFavsRepository.find();
    const albums = await Promise.all(
      albumIds.map(async (albumIds) =>
        this.albumService.getAlbumById(albumIds.albumId),
      ),
    );
    const artists = await Promise.all(
      artistIds.map(async (artistIds) =>
        this.artistService.getArtistById(artistIds.artistId),
      ),
    );
    const tracks = await Promise.all(
      trackIds.map(async (trackIds) =>
        this.trackService.getTrackById(trackIds.trackId),
      ),
    );
    return { albums, artists, tracks };
  }

  async addTrack(id: string) {
    const isTrackExsist = await this.trackService.checkTrackId(id);
    if (!isTrackExsist) return isTrackExsist;
    const isTracktInFavs = this.trackFavsRepository.exist({
      where: { trackId: id },
    });
    if (isTracktInFavs) return true;
    this.trackFavsRepository.save({ trackId: id });
    return true;
  }

  async deleteTrack(id: string) {
    return await this.trackFavsRepository.delete({ trackId: id });
  }

  async addAlbum(id: string) {
    const isAlbumExsist = await this.albumService.checkAlbumId(id);
    if (!isAlbumExsist) return isAlbumExsist;
    const isAlbumtInFavs = this.albumFavsRepository.exist({
      where: { albumId: id },
    });
    if (isAlbumtInFavs) return true;
    this.albumFavsRepository.save({ albumId: id });
    return true;
  }

  async deleteAlbum(id: string) {
    return await this.albumFavsRepository.delete({ albumId: id });
  }

  async addArtist(id: string) {
    const isArtistExsist = await this.artistService.checkArtistId(id);
    if (!isArtistExsist) return isArtistExsist;
    const isArtistInFavs = this.artistFavsRepository.exist({
      where: { artistId: id },
    });
    if (isArtistInFavs) return true;
    this.artistFavsRepository.save({ artistId: id });
    return true;
  }

  async deleteArtist(id: string) {
    return await this.artistFavsRepository.delete({ artistId: id });
  }
}
