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
import { TracksService } from './tracks.service';
import { CreateTrackDto, Track, UpdateTrackDto } from './tracks.validation';
import { TRACK_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller(TRACK_PATH)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Track[] {
    return this.tracksService.getTracks();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.tracksService.getTrackBuId(id);
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
    @Body() updateUserDto: UpdateTrackDto,
  ) {
    try {
      return this.tracksService.changeArtist(updateUserDto, id);
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
      return this.tracksService.removeTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() album: CreateTrackDto): Track {
    return this.tracksService.setTrack(album);
  }
}
