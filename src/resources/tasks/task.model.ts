import { v4 as uuid } from 'uuid';
import { TaskBody } from './task.types';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor({
    id = uuid(),
    title = 'Task',
    order = 0,
    description = 'desc',
    userId = null,
    boardId,
    columnId,
  } : TaskBody) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;