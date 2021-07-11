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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (board) return board;
    throw new NotFoundException();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const res = await this.boardsService.update(id, updateBoardDto);
    if (res) return res;
    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.boardsService.remove(id);
    if (res) return res;
    throw new NotFoundException();
  }
}
