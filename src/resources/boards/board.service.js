import boardsRepo from './board.memory.repository.js';
import { deleteAll as deleteAllTasks } from '../tasks/task.service.js';
import Board from './board.model.js';
import Column from './column.model.js';

export const getAll = () => boardsRepo.getAll();

export const getOne = (boardId) => boardsRepo.getOne(boardId);

export const createOne = (boardData) =>
  boardsRepo.createOne(new Board(boardData));

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

export const deleteOne = async (boardId) => {
  await deleteAllTasks(boardId);
  return boardsRepo.deleteOne(boardId);
};
