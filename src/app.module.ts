import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [DatabaseModule, UserModule, ArtistModule],
  controllers: [AppController, UserController, ArtistController],
  providers: [AppService, UserService, ArtistService],
})
export class AppModule {}
