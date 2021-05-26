import { tasks } from '../../dbMock/db';
import Task from './task.model';

const getAll = async (boardId: string): Promise<Task[] | null> => {
  const tasksObj = tasks[boardId];
  if (tasksObj) {
    return Object.values(tasksObj);
  }
  return null;
};

const getOne = async (boardId: string, taskId: string): Promise<Task | null> => {
  const board = tasks[boardId];
  const task = board ? board[taskId] : null;
  if (tasks && board && task) {
    return task;
  }
  return null;
};

const createOne = async (boardId: string, task: Task): Promise<Task | null> => {
  const board = tasks[boardId] || {};
  tasks[boardId] = board;
  if (task.id && !board[task.id]) {
    board[task.id] = task;
    return task;
  }
  return null;
};

const updateOne = async (boardId: string, task: Task): Promise<Task | null> => {
  const board = tasks[boardId];
  if (board && task.id && board[task.id]) {
    board[task.id] = task;
    return task;
  }
  return null;
};

const deleteOne = async (boardId: string, taskId: string): Promise<true | null> => {
  const board = tasks[boardId];
  if (board && board[taskId]) {
    delete board[taskId];
    return true;
  }
  return null;
};

const deleteAll = async (boardId: string): Promise<true | null> => {
  if (tasks[boardId]) {
    delete tasks[boardId];
    return true;
  }
  return null;
};

const deleteUser = async (userId: string): Promise<void> => {
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
