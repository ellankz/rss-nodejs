import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './boards.service';
import { CreateUserDto } from './dto/create-board.dto';
import { UpdateUserDto } from './dto/update-board.dto';
import { User } from './entities/board.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = User.toResponse(await this.usersService.create(createUserDto));
    if (!res) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    return res;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (user) {
      return User.toResponse(user);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(id, updateUserDto);
    if (res) {
      return res;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.usersService.remove(id);
    if (res) {
      return res;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
