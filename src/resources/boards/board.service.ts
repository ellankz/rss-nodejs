import boardsRepo from './board.memory.repository';
import { deleteAll as deleteAllTasks } from '../tasks/task.service';
import Board from './board.model';
import Column from './column.model';
import { BoardBody } from './board.types';

export const getAll = (): Promise<Board[]> => boardsRepo.getAll();

export const getOne = (boardId: string): Promise<Board | null> => boardsRepo.getOne(boardId);

export const createOne = (boardData: BoardBody): Promise<Board | null> => boardsRepo.createOne(new Board(boardData));

export const updateOne = async (boardId: string, boardData: BoardBody): Promise<Board | null> => {
  const board = await getOne(boardId);

  if (!board) return null;

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

export const deleteOne = async (boardId: string): Promise<true | null> => {
  await deleteAllTasks(boardId);
  return boardsRepo.deleteOne(boardId);
};
