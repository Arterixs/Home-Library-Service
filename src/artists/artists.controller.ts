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

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistsService.getArtists();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.getArtistBuId(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  change(
    @Param('id', ParseUUIDPipe) id: string,
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.artistsService.removeAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() album: CreateArtistDto): Artist {
    return this.artistsService.setArtist(album);
  }
}
