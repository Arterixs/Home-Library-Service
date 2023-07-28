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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artists.validation';
import { ARTIST_PATH } from 'src/constants/const';
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

  @Get(':artistId')
  @GetArtistByIdDescription()
  getById(@Param('artistId', ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.getArtistBuId(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':artistId')
  @PutArtistDescription()
  change(
    @Param('artistId', ParseUUIDPipe) id: string,
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

  @Delete(':artistId')
  @DeleteArtistDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('artistId', ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.removeArtist(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @PostArtistDescription()
  create(@Body() album: CreateArtistDto): Artist {
    return this.artistsService.setArtist(album);
  }
}
