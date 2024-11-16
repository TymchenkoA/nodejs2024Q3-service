import { randomUUID } from 'node:crypto';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

//TODO fix User according to tests, though in Postman it works fine

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const time = new Date();

    const newUser = new User({
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    });

    const createdUser = await this.prisma.user.create({
      data: {
        id: newUser.id,
        login: newUser.login,
        password: newUser.password,
        version: newUser.version,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });

    const { password, ...userWithoutPassword } = createdUser;
    // return {
    //   ...userWithoutPassword,
    //   createdAt: userWithoutPassword.createdAt.getTime(),
    //   updatedAt: userWithoutPassword.updatedAt.getTime(),
    // };

    userWithoutPassword.createdAt = new Date(userWithoutPassword.createdAt);
    userWithoutPassword.updatedAt = new Date(userWithoutPassword.updatedAt);

    return userWithoutPassword;
  }

  // async delete(id: string) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id },
  //   });

  //   if (user === null) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   await this.prisma.user.delete({
  //     where: { id },
  //   });
  // }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedVersion = user.version + 1;
    const updatedTime = new Date();

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: updatedVersion,
        updatedAt: updatedTime,
      },
    });
  }
}
