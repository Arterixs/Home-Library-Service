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
import { AlbumsService } from './albums.service';
import { ALBUM_NOT_FOUND, ALBUM_PARAM, ALBUM_PATH } from 'src/constants/const';
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
  async getById(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.albumsService.getAlbumById(id);
    if (result) return result;
    throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  @PostAlbumDescription()
  async create(@Body() album: CreateAlbumDto): Promise<void | Album> {
    return await this.albumsService.setAlbum(album);
  }

  @Put(`:${ALBUM_PARAM}`)
  @PutAlbumDescription()
  async change(
    @Param(ALBUM_PARAM, ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateAlbumDto,
  ) {
    const result = await this.albumsService.changeAlbum(updateUserDto, id);
    if (result) {
      return result;
    }
    throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(`:${ALBUM_PARAM}`)
  @DeleteAlbumDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param(ALBUM_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.albumsService.removeAlbum(id);
    if (result.affected) return result;
    throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
