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
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ): User {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id) {
    this.userService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }
}
