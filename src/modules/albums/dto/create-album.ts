import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Album } from '../entity/album';
import { FORMAT_UUID } from 'src/constants/const';

export class CreateAlbumDto {
  @ApiProperty({ example: 'The Long Dark' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1994 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: null, nullable: true })
  @ValidateIf((album: Album) => album.artistId !== null)
  @IsUUID(FORMAT_UUID)
  @IsNotEmpty()
  artistId: string | null;
}
