import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsService {
  getHello(): string {
    return 'Hello Artists!';
  }
}
