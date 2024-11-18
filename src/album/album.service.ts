import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album | undefined> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album({
      id: randomUUID(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });

    await this.prisma.album.create({
      data: newAlbum,
    });
    return newAlbum;
  }

  async delete(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (album === null) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.prisma.album.delete({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    const updatedAlbum = new Album({
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    });

    const updatedData = await this.prisma.album.update({
      where: { id },
      data: updatedAlbum,
    });

    return updatedData;
  }

  async handleArtistDeletion(artId: string): Promise<void> {
    const albums = await this.findAll();
    albums.map(async ({ artistId, id }) => {
      if (artistId === artId) {
        await this.prisma.album.update({
          where: { id },
          data: {
            artistId: null,
          },
        });
      }
    });
  }
}
