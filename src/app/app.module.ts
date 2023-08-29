import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from '../modules/user/user.module';
import { TracksModule } from '../modules/tracks/tracks.module';
import { FavoritesModule } from '../modules/favorites/favorites.module';
import { ArtistsModule } from '../modules/artists/artists.module';
import { AlbumsModule } from '../modules/albums/albums.module';
import { DatabaseModule } from '../modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { LoggerMiddleware } from 'src/common/middleware/logger.middle';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filter/exception';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
