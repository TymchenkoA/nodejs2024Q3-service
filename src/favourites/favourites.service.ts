import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InMemoryDbService } from '../database/in-memory-db.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavouritesService {
  private readonly collection = 'favourites';

  constructor(
    private readonly dbService: InMemoryDbService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  addToFavourites(
    collection: 'artists' | 'albums' | 'tracks',
    id: string,
  ): void {
    if (collection === 'artists') {
      this.artistService.findOne(id);
    } else if (collection === 'albums') {
      this.albumService.findOne(id);
    } else if (collection === 'tracks') {
      this.trackService.findOne(id);
    }

    this.dbService.addFavourite(collection, id);
  }

  removeFromFavourites(
    collection: 'artists' | 'albums' | 'tracks',
    id: string,
  ): void {
    if (!this.dbService.isFavourite(collection, id)) {
      throw new NotFoundException(
        `The ${collection.slice(0, -1)} with ID ${id} is not in favorites`,
      );
    }

    this.dbService.removeFavourite(collection, id);
  }

  getAllFavourites() {
    return this.dbService.findAllFavourites();
  }
}
