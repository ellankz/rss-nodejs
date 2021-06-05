import { boards } from '../../dbMock/db';
import Board from './board.model';

const getAll = async (): Promise<Board[]> => Object.values(boards);

const getOne = async (id: string): Promise<Board | null>  => {
  const board = boards[id];
  return board || null;
};

const createOne = async (board: Board): Promise<Board | null> => {
  if (board && !boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const updateOne = async (board: Board): Promise<Board | null> => {
  if (board && boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const deleteOne = async (id: string): Promise<true | null> => {
  if (id && boards[id]) {
    delete boards[id];
    return true;
  }
  return null;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
