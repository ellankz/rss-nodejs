import { v4 as uuid } from 'uuid';
import { BoardBody } from './board.types';
import Column from './column.model';

class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({ id = uuid(), title = 'Board title', columns = [] }: BoardBody) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
