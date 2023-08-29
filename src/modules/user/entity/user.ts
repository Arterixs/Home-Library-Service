import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Uncle John' })
  @Column({ type: 'text' })
  login: string;

  @ApiProperty({ example: 1 })
  @VersionColumn({ type: 'int' })
  version: number;

  @ApiProperty({ example: 1655000000 })
  @CreateDateColumn({
    transformer: {
      to: () => new Date(Date.now()),
      from: (value: Date) => value.getTime(),
    },
  })
  createdAt: Date;

  @ApiProperty({ example: 1655000000 })
  @UpdateDateColumn({
    transformer: {
      to: () => new Date(Date.now()),
      from: (value: Date) => value.getTime(),
    },
  })
  updatedAt: Date;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
