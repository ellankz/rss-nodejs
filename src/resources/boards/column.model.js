import { v4 as uuid } from 'uuid';

class Column {
  constructor({ id = uuid(), title = 'Column title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
