import { boards } from '../../dbMock/db';
import Board from './board.model';

const getAll = async () => Object.values(boards);

const getOne = async (id: string) => {
  if (id && boards[id]) {
    return boards[id];
  }
  return null;
};

const createOne = async (board: Board) => {
  if (board && !boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const updateOne = async (board: Board) => {
  if (board && boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const deleteOne = async (id: string) => {
  if (id && boards[id]) {
    delete boards[id];
    return true;
  }
  return null;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
