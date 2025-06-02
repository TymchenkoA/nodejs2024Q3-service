import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private db: {
    users: any[];
    artists: any[];
    tracks: any[];
    albums: any[];
    favourites: { artists: any[]; tracks: any[]; albums: any[] };
  } = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favourites: {
      artists: [],
      tracks: [],
      albums: [],
    },
  };

  private isFavouritesCollection(
    collection: string,
  ): collection is 'favourites' {
    return collection === 'favourites';
  }

  findAll<T>(collection: string): T[] {
    if (this.isFavouritesCollection(collection)) {
      throw new Error('Use findAllFavorites() to retrieve favourites');
    }
    return this.db[collection] as T[];
  }

  findOne<T>(collection: string, id: string): T {
    if (this.isFavouritesCollection(collection)) {
      throw new Error('Use findFavoritesByCategory() to retrieve favourites');
    }
    const entity = this.db[collection].find((item) => item.id === id);
    if (!entity) {
      throw new NotFoundException(`${collection} with ID ${id} not found`);
    }
    return entity;
  }

  create<T>(collection: string, entity: T): T {
    if (this.isFavouritesCollection(collection)) {
      throw new Error('Use addFavorite() to add items to favourites');
    }
    this.db[collection].push(entity);
    return entity;
  }

  delete(collection: string, id: string): void {
    if (this.isFavouritesCollection(collection)) {
      throw new Error('Use removeFavorite() to delete items from favourites');
    }
    const index = this.db[collection].findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`${collection} with ID ${id} not found`);
    }
    this.db[collection].splice(index, 1);
  }

  update<T>(collection: string, id: string, updatedData: Partial<T>): T {
    if (this.isFavouritesCollection(collection)) {
      throw new Error(
        'Favourites cannot be updated directly; use add/remove methods',
      );
    }
    const index = this.db[collection].findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`${collection} with ID ${id} not found`);
    }
    this.db[collection][index] = {
      ...this.db[collection][index],
      ...updatedData,
    };
    return this.db[collection][index] as T;
  }

  // === Favorites-specific methods ===

  isFavourite(
    collection: 'artists' | 'albums' | 'tracks',
    id: string,
  ): boolean {
    const favourites = this.db['favourites'];
    return favourites[collection].includes(id);
  }

  addFavourite(collection: 'artists' | 'tracks' | 'albums', id: string): void {
    const favourites = this.db['favourites'];
    if (!favourites[collection].includes(id)) {
      favourites[collection].push(id);
    }
  }

  removeFavourite(
    collection: 'artists' | 'tracks' | 'albums',
    id: string,
  ): void {
    const favourites = this.db['favourites'];
    const index = favourites[collection].indexOf(id);
    if (index !== -1) {
      favourites[collection].splice(index, 1);
    }
  }

  findAllFavourites(): { artists: any[]; tracks: any[]; albums: any[] } {
    return this.db['favourites'];
  }
}
