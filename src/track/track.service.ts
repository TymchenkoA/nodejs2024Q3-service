import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track | undefined> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track({
      id: randomUUID(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });

    await this.prisma.track.create({
      data: newTrack,
    });

    return newTrack;
  }

  async delete(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (track === null) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.prisma.track.delete({
      where: { id },
    });
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

    const updatedData = await this.prisma.track.update({
      where: { id },
      data: updatedTrack,
    });

    return updatedData;
  }

  async handleAlbumDeletion(albId: string): Promise<void> {
    const tracks = await this.findAll();

    tracks.map(async ({ albumId, id }) => {
      if (albumId === albId) {
        await this.prisma.track.update({
          where: { id },
          data: {
            albumId: null,
          },
        });
      }
    });
  }

  async handleArtistDeletion(artId: string): Promise<void> {
    const tracks = await this.findAll();

    tracks.map(async ({ artistId, id }) => {
      if (artistId === artId) {
        await this.prisma.track.update({
          where: { id },
          data: {
            artistId: null,
          },
        });
      }
    });
  }
}
