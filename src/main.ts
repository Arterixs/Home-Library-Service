import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_PORT } from './constants/const';
import { ConfigSwagger } from './configs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MyLogger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
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

process.on('uncaughtException', (err) => {
  const logger = new Logger('Global');
  logger.error(`UncaughtException error, ${err}`, 'Error');
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  const logger = new Logger('Global');
  logger.error(`unhandledRejection error, ${err} `, 'Error');
  process.exit(1);
});
