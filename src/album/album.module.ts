import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from '../database/database.module';
import { TrackService } from '../track/track.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
})
export class AlbumModule {}
