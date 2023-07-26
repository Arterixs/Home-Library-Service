import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksService {
  getHello(): string {
    return 'Hello Tracks!';
  }
}
