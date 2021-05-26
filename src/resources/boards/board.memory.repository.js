import { boards } from '../../dbMock/db.js';

const getAll = async () => Object.values(boards);

const getOne = async (id) => {
  if (boards[id]) {
    return boards[id];
  }
  return null;
};

const createOne = async (board) => {
  if (!boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const updateOne = async (board) => {
  if (boards[board.id]) {
    boards[board.id] = board;
    return board;
  }
  return null;
};

const deleteOne = async (id) => {
  if (boards[id]) {
    delete boards[id];
    return true;
  }
  return null;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
