import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
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
    throw new NotFoundException();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(id, updateUserDto);
    if (res) return res;
    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.usersService.remove(id);
    if (res) return res;
    throw new NotFoundException();
  }
}
