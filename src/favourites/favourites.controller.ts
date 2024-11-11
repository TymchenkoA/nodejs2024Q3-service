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
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addToFavourites('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeFromFavourites('tracks', id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addToFavourites('albums', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeFromFavourites('albums', id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addToFavourites('artists', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeFromFavourites('artists', id);
  }
}
