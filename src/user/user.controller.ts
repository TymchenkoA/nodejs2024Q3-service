import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  findAll(): User[] {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param() param): string {
  //   return `User ${param.id}`;
  // }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id): User {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id) {
    return this.userService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id) {
    return this.userService.update(id, updatePasswordDto);
  }
}
