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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return await this.tasksService.findAll(boardId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    const task = await this.tasksService.findOne(boardId, id);
    if (task) return task;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const res = await this.tasksService.update(boardId, id, updateTaskDto);
    if (res) return res;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    const res = await this.tasksService.remove(boardId, id);
    if (res) return res;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
