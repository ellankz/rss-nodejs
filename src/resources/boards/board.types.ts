import Column from './column.model';

export interface BoardBody {
  id?: string,
  title?: string,
  columns?: Column[],
}
