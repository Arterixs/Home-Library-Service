import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TRACK_NOT_FOUND, TRACK_PARAM, TRACK_PATH } from 'src/constants/const';
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
  async getAll() {
    return await this.tracksService.getTracks();
  }

  @Get(`:${TRACK_PARAM}`)
  @GetTrackByIdDescription()
  async getById(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.tracksService.getTrackById(id);
    if (result) return result;
    throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  @PostTrackDescription()
  async create(@Body() album: CreateTrackDto) {
    return await this.tracksService.setTrack(album);
  }

  @Put(`:${TRACK_PARAM}`)
  @PutTrackDescription()
  async change(
    @Param(TRACK_PARAM, ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateTrackDto,
  ) {
    const result = await this.tracksService.changeTrack(updateUserDto, id);
    if (result) {
      return result;
    }
    throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(`:${TRACK_PARAM}`)
  @DeleteTrackDescription()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param(TRACK_PARAM, ParseUUIDPipe) id: string) {
    const result = await this.tracksService.removeTrack(id);
    if (result.affected) return result;
    throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
