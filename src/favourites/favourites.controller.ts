import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @HttpCode(200)
  getAllFavourites() {
    return this.favouritesService.getAllFavourites();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addTrackToFavourites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeTrackToFavourites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addAlbumToFavourites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeAlbumToFavourites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addArtistToFavourites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavourites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeArtistToFavourites(id);
  }
}
