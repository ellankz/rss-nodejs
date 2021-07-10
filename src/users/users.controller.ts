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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('1', createUserDto.name);

    const user = await this.usersService.create(createUserDto);
    if (user) return User.toResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (user) return User.toResponse(user);
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(id, updateUserDto);
    if (res) return res;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.usersService.remove(id);
    if (res) return res;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
