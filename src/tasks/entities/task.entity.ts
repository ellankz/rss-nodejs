import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ITask } from '../interfaces/task.interface';

@Entity({ name: 'task' })
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('integer')
  order!: number;

  @Column('varchar', { length: 200 })
  description!: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string;

  @Column('uuid', { nullable: true })
  columnId!: string;
}
