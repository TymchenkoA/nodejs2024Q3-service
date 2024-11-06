import { randomUUID } from 'node:crypto';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 'h87q7551-8286857',
      login: 'User1',
      password: 'User1p',
      version: 1,
      createdAt: 45431,
      updatedAt: 998257,
    },
    {
      id: 'h87q7551-82865347',
      login: 'User2',
      password: 'User2p',
      version: 1,
      createdAt: 45651,
      updatedAt: 998258,
    },
    {
      id: 'h87q7551-82868cd',
      login: 'User3',
      password: 'User3p',
      version: 1,
      createdAt: 45821,
      updatedAt: 99825235,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
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

    this.users.push(newUser);

    return newUser;
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users[index];

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

    this.users[index] = updatedUser;

    return updatedUser;
  }
}
