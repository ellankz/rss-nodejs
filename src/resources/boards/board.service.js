import boardsRepo from './board.memory.repository.js';
import { deleteAll as deleteAllTasks } from '../tasks/task.service.js';
import Board from './board.model.js';
import Column from './column.model.js';

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
export const getAll = () => boardsRepo.getAll();

/** Get one board by id
 * @param {string} boardId
 * @return {Board} Board
 */
export const getOne = (boardId) => boardsRepo.getOne(boardId);

/** Create one board
 * @param {Board} boardData
 * @return {Board|null} Board
 */
export const createOne = (boardData) =>
  boardsRepo.createOne(new Board(boardData));

/** Update one board
 * @param {string} boardId
 * @param {Board} boardData
 * @return {Board|null} Board
 */
export const updateOne = async (boardId, boardData) => {
  const board = await getOne(boardId);
  if (boardData.title) {
    board.title = boardData.title;
  }
  if (Array.isArray(boardData.columns)) {
    board.columns = [];
    boardData.columns.forEach((col) => {
      board.columns.push(new Column(col));
    });
  }
  return boardsRepo.updateOne(board);
};

/** Delete one board
 * @param {string} boardId
 * @return {boolean|null} Board
 */
export const deleteOne = async (boardId) => {
  await deleteAllTasks(boardId);
  return boardsRepo.deleteOne(boardId);
};
