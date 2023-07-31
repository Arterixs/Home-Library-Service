import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Track } from '../entity/track';

export class UpdateTrackDto {
  @ApiProperty({ example: 'Toca Toca' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @ValidateIf((track: Track) => track.artistId !== null)
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @ValidateIf((track: Track) => track.albumId !== null)
  @IsUUID(4)
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({ example: 320, description: 'In seconds' })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
