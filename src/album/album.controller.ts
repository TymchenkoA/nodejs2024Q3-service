import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';
import { TrackService } from '../track/track.service';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('User not found');
    }
    return album;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<void> {
    await this.albumService.delete(id);
    await this.trackService.handleAlbumDeletion(id);
    // await this.favoriteService.removeAlbumFromFavorites(id); // TODO Remove from favorites
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<Album> {
    return await this.albumService.update(id, updateAlbumDto);
  }
}
