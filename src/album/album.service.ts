import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InMemoryDbService } from '../database/in-memory-db.service';

@Injectable()
export class AlbumService {
  private collection = 'albums';

  constructor(private readonly dbService: InMemoryDbService) {}

  async findAll(): Promise<Album[]> {
    return this.dbService.findAll<Album>(this.collection);
  }

  async findOne(id: string): Promise<Album | undefined> {
    return this.dbService.findOne<Album>(this.collection, id);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album({
      id: randomUUID(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });

    await this.dbService.create<Album>(this.collection, newAlbum);

    return newAlbum;
  }

  async delete(id: string): Promise<void> {
    this.dbService.delete(this.collection, id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    const updatedAlbum = new Album({
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    });

    const updatedData = await this.dbService.update<Album>(
      this.collection,
      id,
      updatedAlbum,
    );

    return updatedData;
  }
}
