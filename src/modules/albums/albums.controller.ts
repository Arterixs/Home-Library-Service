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
import { AlbumsService } from './albums.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './albums.validation';
import { ALBUM_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteAlbumDescription,
  GetAlbumByIdDescription,
  GetAllAlbumsDescription,
  PostAlbumDescription,
  PutAlbumDescription,
} from 'src/swagger/album';

@ApiTags('Album')
@Controller(ALBUM_PATH)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @GetAllAlbumsDescription()
  getAll(): Album[] {
    return this.albumsService.getAlbums();
  }

  @Get(':albumId')
  @GetAlbumByIdDescription()
  getById(@Param('albumId', ParseUUIDPipe) id: string) {
    try {
      return this.albumsService.getAlbumBuId(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post()
  @PostAlbumDescription()
  create(@Body() album: CreateAlbumDto): Album {
    return this.albumsService.setAlbum(album);
  }

  @Put(':albumId')
  @PutAlbumDescription()
  change(
    @Param('albumId', ParseUUIDPipe) id: string,
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

  @Delete(':albumId')
  @DeleteAlbumDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('albumId', ParseUUIDPipe) id: string) {
    try {
      return this.albumsService.removeAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
