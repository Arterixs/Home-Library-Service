import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Track {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Toca Toca' })
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({ example: null, nullable: true })
  albumId: string | null;

  @ApiProperty({ example: 160 })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}

export class CreateTrackDto {
  @ApiProperty({ example: 'Toca Toca' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({ example: null, nullable: true })
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({ example: 160 })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @ApiProperty({ example: 'Toca Toca' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({ example: 320 })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
