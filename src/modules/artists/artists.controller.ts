import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artists.validation';
import { ARTIST_PARAM, ARTIST_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteArtistDescription,
  GetAllArtistDescription,
  GetArtistByIdDescription,
  PostArtistDescription,
  PutArtistDescription,
} from 'src/swagger/artist';

@ApiTags('Artist')
@Controller(ARTIST_PATH)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @GetAllArtistDescription()
  getAll(): Artist[] {
    return this.artistsService.getArtists();
  }

  @Get(`:${ARTIST_PARAM}`)
  @GetArtistByIdDescription()
  getById(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.getArtistBuId(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post()
  @PostArtistDescription()
  create(@Body() album: CreateArtistDto): Artist {
    return this.artistsService.setArtist(album);
  }

  @Put(`:${ARTIST_PARAM}`)
  @PutArtistDescription()
  change(
    @Param(ARTIST_PARAM, ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateArtistDto,
  ) {
    try {
      return this.artistsService.changeArtist(updateUserDto, id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Delete(`:${ARTIST_PARAM}`)
  @DeleteArtistDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.removeArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
