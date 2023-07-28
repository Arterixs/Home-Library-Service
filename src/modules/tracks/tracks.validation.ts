import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Track {
  id: string;
  name: string;
  artistId?: string | null;
  albumId?: string | null;
  duration: number;
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
