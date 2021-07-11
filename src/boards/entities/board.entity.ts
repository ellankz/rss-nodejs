import {
  Entity,
  Column as DBColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import { IColumn } from '../interfaces/column.interface';

@Entity({ name: 'board' })
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @DBColumn('varchar', { length: 255 })
  title!: string;

  @OneToMany('Column', 'board')
  columns?: IColumn[];
}
