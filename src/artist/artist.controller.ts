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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('User not found');
    }
    return artist;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<void> {
    await this.artistService.delete(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): Promise<Artist> {
    return await this.artistService.update(id, updateArtistDto);
  }
}
