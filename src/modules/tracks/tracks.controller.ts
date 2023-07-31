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
import { TracksService } from './tracks.service';
import { TRACK_PARAM, TRACK_PATH } from 'src/constants/const';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteTrackDescription,
  GetAllTracksDescription,
  GetTrackByIdDescription,
  PostTrackDescription,
  PutTrackDescription,
} from './swagger';
import { Track } from './entity/track';
import { CreateTrackDto } from './dto/create-track';
import { UpdateTrackDto } from './dto/update-track';

@ApiTags('Track')
@Controller(TRACK_PATH)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @GetAllTracksDescription()
  getAll(): Track[] {
    return this.tracksService.getTracks();
  }

  @Get(`:${TRACK_PARAM}`)
  @GetTrackByIdDescription()
  getById(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    try {
      return this.tracksService.getTrackBuId(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post()
  @PostTrackDescription()
  create(@Body() album: CreateTrackDto): Track {
    return this.tracksService.setTrack(album);
  }

  @Put(`:${TRACK_PARAM}`)
  @PutTrackDescription()
  change(
    @Param(TRACK_PARAM, ParseUUIDPipe) id: string,
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

  @Delete(`:${TRACK_PARAM}`)
  @DeleteTrackDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    try {
      return this.tracksService.removeTrack(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
