import { v4 as uuid } from 'uuid';

/**
 * Class representing a column
 */
class Column {
  /**
   * Create a column.
   * @param {string} id - Column id
   * @param {string} title - Title
   * @param {number} order - Order number
   */
  constructor({ id = uuid(), title = 'Column title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
