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
  artistId: string | null;
  albumId: string | null;
  duration: number;
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;

  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;

  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
