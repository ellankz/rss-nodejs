import { v4 as uuid } from 'uuid';

/**
 * @typedef Column
 * @type {Object}
 * @property {string} id
 * @property {string} title
 * @property {number} order
 */

/**
 * Class representing a board
 */
class Board {
  /**
   * Create a board.
   * @param {string} id - Board id
   * @param {string} title - Title
   * @param {Array.<Column>} columns - Array of columns
   */
  constructor({ id = uuid(), title = 'Board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
