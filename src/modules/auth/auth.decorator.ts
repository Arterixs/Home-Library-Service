import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const IS_PUBLIC_KEY = configService.get<string>('PUBLIC_KEY');
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
