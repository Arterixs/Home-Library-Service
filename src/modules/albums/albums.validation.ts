import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Album {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'White Spider' })
  name: string;

  @ApiProperty({ example: 2013 })
  year: number;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}

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
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @ApiProperty({ example: 'Scooby Doo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2028 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;
}
