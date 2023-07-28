import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
