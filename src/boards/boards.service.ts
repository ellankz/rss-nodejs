import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Column } from './entities/column.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Column)
    private columnsRepository: Repository<Column>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardsRepository.create(createBoardDto);
    return this.boardsRepository.save(newBoard);
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find({ relations: ['columns'] });
  }

  findOne(id: string): Promise<Board> {
    return this.boardsRepository.findOne(id, { relations: ['columns'] });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const oldBoard = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    const { columns = [], title } = updateBoardDto;
    const deleteResults = oldBoard?.columns?.map((col) =>
      this.columnsRepository.delete(col.id),
    );
    if (deleteResults) {
      await Promise.all(deleteResults);
    }
    const newCols = columns.map((col) => this.columnsRepository.create(col));
    if (title) {
      const board = await this.boardsRepository.findOne(id);
      if (board) {
        await this.boardsRepository.update(id, { title });
      }
    }
    const board = await this.boardsRepository.findOne(id);
    await this.columnsRepository.save(newCols);
    if (board) {
      board.columns = newCols;
      return this.boardsRepository.save(board);
    }
    return undefined;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.boardsRepository.delete(id);
  }
}
