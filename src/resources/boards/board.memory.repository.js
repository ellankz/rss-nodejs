import { boards } from '../../dbMock/db.js';

/**
 * @typedef Column
 * @type {Object}
 * @property {string} id
 * @property {string} title
 * @property {number} order
 */

/**
 * @typedef  Board
 * @type {Object}
 * @property {string} id
 * @property {string} title
 * @property {Array.<Column>} columns
 */

/** Get all boards
 * @return {Array.<Board>} All boards
 */
const getAll = async () => Object.values(boards);

/** Get one board by id
 * @param {string} id
 * @return {Board} Board
 */
const getOne = async (id) => {
  if (boards[id]) {
    return boards[id];
  }
  return null;
};

/** Create one board
 * @param {Board} board
 * @return {Board|null} Board
 */
const createOne = async (board) => {
  if (!boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

/** Update one board
 * @param {Board} board
 * @return {Board|null} Board
 */
const updateOne = async (board) => {
  if (boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

/** Delete one board
 * @param {string} id
 * @return {boolean|null} Board
 */
const deleteOne = async (id) => {
  if (boards[id]) {
    delete boards[id];
    return true;
  }
  return null;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
