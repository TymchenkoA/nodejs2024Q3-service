import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { PrismaModule } from './prisma/prisma.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    ArtistModule,
    TrackModule,
    AlbumModule,
    PrismaModule,
    UserModule,
    FavouritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
