import { Connection, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private connection: Connection,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create({ ...createTaskDto, boardId });
    return this.tasksRepository.save(newTask);
  }

  findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { boardId },
      loadRelationIds: true,
    });
  }

  findOne(boardId: string, id: string): Promise<Task> {
    return this.tasksRepository.findOne(id, {
      where: { boardId },
      loadRelationIds: true,
    });
  }

  async update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne(id, {
      where: { boardId },
    });
    if (task) {
      const updateRes = await this.tasksRepository.update(id, updateTaskDto);
      return updateRes.raw;
    }
  }

  async remove(_boardId: string, id: string): Promise<DeleteResult> {
    return await this.tasksRepository.delete(id);
  }
}
