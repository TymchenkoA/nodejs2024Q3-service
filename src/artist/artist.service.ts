import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDbService } from '../database/in-memory-db.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private collection = 'artists';

  constructor(private readonly dbService: InMemoryDbService) {}

  async findAll(): Promise<Artist[]> {
    return this.dbService.findAll<Artist>(this.collection);
  }

  async findOne(id: string): Promise<Artist | undefined> {
    return this.dbService.findOne<Artist>(this.collection, id);
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist({
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    await this.dbService.create<Artist>(this.collection, newArtist);
    return newArtist;
  }

  //TODO set album.artistId, track.artistId to null after deletion
  async delete(id: string): Promise<void> {
    this.dbService.delete(this.collection, id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    const updatedArtist = new Artist({
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    });

    const updatedData = await this.dbService.update<Artist>(
      this.collection,
      id,
      updatedArtist,
    );

    return updatedData;
  }
}
