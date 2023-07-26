import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getHello(): string {
    return this.artistsService.getHello();
  }
}
