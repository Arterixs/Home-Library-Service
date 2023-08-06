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
import { ALBUM_PARAM, ALBUM_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteAlbumDescription,
  GetAlbumByIdDescription,
  GetAllAlbumsDescription,
  PostAlbumDescription,
  PutAlbumDescription,
} from './swagger';
import { Album } from './entity/album';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';

@ApiTags('Album')
@Controller(ALBUM_PATH)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @GetAllAlbumsDescription()
  async getAll(): Promise<Album[]> {
    return await this.albumsService.getAlbums();
  }

  @Get(`:${ALBUM_PARAM}`)
  @GetAlbumByIdDescription()
  getById(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
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
  create(@Body() album: CreateAlbumDto): Promise<void | Album> {
    return this.albumsService.setAlbum(album);
  }

  @Put(`:${ALBUM_PARAM}`)
  @PutAlbumDescription()
  change(
    @Param(ALBUM_PARAM, ParseUUIDPipe) id: string,
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

  @Delete(`:${ALBUM_PARAM}`)
  @DeleteAlbumDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
    try {
      return this.albumsService.removeAlbum(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
