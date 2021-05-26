import { tasks } from '../../dbMock/db';
import Task from './task.model';

const getAll = async (boardId: string) => {
  const tasksObj = tasks[boardId];
  if (tasksObj) {
    return Object.values(tasksObj);
  }
  return null;
};

const getOne = async (boardId: string, taskId: string) => {
  const board = tasks[boardId];
  if (tasks && board && board[taskId]) {
    return board[taskId];
  }
  return null;
};

const createOne = async (boardId: string, task: Task) => {
  const board = tasks[boardId] || {};
  tasks[boardId] = board;
  if (task.id && !board[task.id]) {
    board[task.id] = task;
    return task;
  }
  return null;
};

const updateOne = async (boardId: string, task: Task) => {
  const board = tasks[boardId];
  if (board && task.id && board[task.id]) {
    board[task.id] = task;
    return task;
  }
  return null;
};

const deleteOne = async (boardId: string, taskId: string) => {
  const board = tasks[boardId];
  if (board && board[taskId]) {
    delete board[taskId];
    return true;
  }
  return null;
};

const deleteAll = async (boardId: string) => {
  if (tasks[boardId]) {
    delete tasks[boardId];
    return true;
  }
  return null;
};

const deleteUser = (userId: string) => {
  Object.values(tasks).forEach((board) => {
    Object.values(board).forEach((paramTask) => {
      const task = paramTask;
      if (task.userId === userId) {
        task.userId = null;
      }
    });
  });
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  deleteAll,
  deleteUser,
};
