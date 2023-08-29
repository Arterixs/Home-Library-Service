import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import {
  ARTIST_NOT_FOUND,
  ARTIST_PARAM,
  ARTIST_PATH,
} from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteArtistDescription,
  GetAllArtistDescription,
  GetArtistByIdDescription,
  PostArtistDescription,
  PutArtistDescription,
} from './swagger';
import { CreateArtistDto } from './dto/create-artist';
import { UpdateArtistDto } from './dto/update-artist';

@ApiTags('Artist')
@Controller(ARTIST_PATH)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @GetAllArtistDescription()
  async getAll() {
    return await this.artistsService.getArtists();
  }

  @Get(`:${ARTIST_PARAM}`)
  @GetArtistByIdDescription()
  async getById(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.artistsService.getArtistById(id);
    if (result) return result;
    throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  @PostArtistDescription()
  async create(@Body() album: CreateArtistDto) {
    return await this.artistsService.setArtist(album);
  }

  @Put(`:${ARTIST_PARAM}`)
  @PutArtistDescription()
  async change(
    @Param(ARTIST_PARAM, ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateArtistDto,
  ) {
    const result = await this.artistsService.changeArtist(updateUserDto, id);
    if (result) return result;
    throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(`:${ARTIST_PARAM}`)
  @DeleteArtistDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param(ARTIST_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.artistsService.removeArtist(id);
    if (result.affected) return result;
    throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
