import { randomUUID } from 'node:crypto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InMemoryDbService } from '../database/in-memory-db.service';

@Injectable()
export class UserService {
  private readonly collection = 'users';

  constructor(private readonly dbService: InMemoryDbService) {}

  findAll(): User[] {
    return this.dbService.findAll<User>(this.collection);
  }

  findOne(id: string): User {
    return this.dbService.findOne<User>(this.collection, id);
  }

  create(createUserDto: CreateUserDto) {
    const time = new Date().getTime();

    const newUser = new User({
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    });

    return this.dbService.create<User>(this.collection, newUser);
  }

  delete(id: string) {
    this.dbService.delete(this.collection, id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = this.findOne(id);

    if (oldPassword !== user.password) {
      throw new ForbiddenException('Old password is  incorrect');
    }

    const updatedVersion = user.version + 1;
    const updatedTime = new Date().getTime();

    const updatedUser = new User({
      ...user,
      password: newPassword,
      version: updatedVersion,
      updatedAt: updatedTime,
    });

    const updatedData = this.dbService.update<User>(
      this.collection,
      id,
      updatedUser,
    );

    return new User({
      ...updatedData,
    });
  }
}
