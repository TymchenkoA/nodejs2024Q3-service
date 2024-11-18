import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist | undefined> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist({
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    await this.prisma.artist.create({
      data: newArtist,
    });

    return newArtist;
  }

  async delete(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (artist === null) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.prisma.artist.delete({
      where: { id },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    const updatedArtist = new Artist({
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    });

    const updatedData = await this.prisma.artist.update({
      where: { id },
      data: updatedArtist,
    });

    return updatedData;
  }
}
