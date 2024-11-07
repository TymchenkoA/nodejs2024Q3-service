import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InMemoryDbService } from '../database/in-memory-db.service';

@Injectable()
export class TrackService {
  private collection = 'tracks';

  constructor(private readonly dbService: InMemoryDbService) {}

  async findAll(): Promise<Track[]> {
    return this.dbService.findAll<Track>(this.collection);
  }

  async findOne(id: string): Promise<Track | undefined> {
    return this.dbService.findOne<Track>(this.collection, id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track({
      id: randomUUID(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });

    await this.dbService.create<Track>(this.collection, newTrack);

    return newTrack;
  }

  async delete(id: string): Promise<void> {
    this.dbService.delete(this.collection, id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);

    const updatedTrack = new Track({
      ...track,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    });

    const updatedData = await this.dbService.update<Track>(
      this.collection,
      id,
      updatedTrack,
    );

    return updatedData;
  }
}
