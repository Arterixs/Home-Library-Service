import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_PORT } from './constants/const';
import { ConfigSwagger } from './configs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', DEFAULT_PORT);
  app.enableCors({ origin: true });
  ConfigSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
