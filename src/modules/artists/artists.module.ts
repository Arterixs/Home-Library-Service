import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entity/artist';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
