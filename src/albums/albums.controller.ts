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
import { AlbumsService } from './albums.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './albums.validation';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll(): Album[] {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.albumsService.getAlbumBuId(id);
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
    @Body() updateUserDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumsService.changeAlbum(updateUserDto, id);
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
      return this.albumsService.removeAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() album: CreateAlbumDto): Album {
    return this.albumsService.setAlbum(album);
  }
}
