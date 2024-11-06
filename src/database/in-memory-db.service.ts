import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private db: { [key: string]: any[] } = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: [],
  };

  findAll<T>(collection: string): T[] {
    return this.db[collection];
  }

  findOne<T>(collection: string, id: string): T {
    const entity = this.db[collection].find((item) => item.id === id);
    if (!entity) {
      throw new NotFoundException(`${collection} with ID ${id} not found`);
    }
    return entity;
  }

  create<T>(collection: string, entity: T): T {
    this.db[collection].push(entity);
    return entity;
  }

  delete(collection: string, id: string): void {
    const index = this.db[collection].findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`${collection} with ID ${id} not found`);
    }
    this.db[collection].splice(index, 1);
  }

  update<T>(collection: string, id: string, updatedData: Partial<T>): T {
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
}
