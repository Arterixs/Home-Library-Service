import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_PORT } from './constants/const';
import { ConfigSwagger } from './swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', DEFAULT_PORT);
  ConfigSwagger(app);
  await app.listen(port);
}
bootstrap();
