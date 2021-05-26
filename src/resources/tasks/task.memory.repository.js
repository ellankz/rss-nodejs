import { tasks } from '../../dbMock/db.js';

const getAll = async (boardId) => Object.values(tasks[boardId]);

const getOne = async (boardId, taskId) => {
  if (tasks[boardId] && tasks[boardId][taskId]) {
    return tasks[boardId][taskId];
  }
  return null;
};

const createOne = async (boardId, task) => {
  if (!tasks[boardId]) {
    tasks[boardId] = {};
  }
  if (!tasks[boardId][task.id]) {
    tasks[boardId][task.id] = task;
    return task;
  }
  return null;
};

const updateOne = async (boardId, task) => {
  if (tasks[boardId] && tasks[boardId][task.id]) {
    tasks[boardId][task.id] = task;
    return task;
  }
  return null;
};

const deleteOne = async (boardId, taskId) => {
  if (tasks[boardId] && tasks[boardId][taskId]) {
    delete tasks[boardId][taskId];
    return true;
  }
  return null;
};

const deleteAll = async (boardId) => {
  if (tasks[boardId]) {
    delete tasks[boardId];
    return true;
  }
  return null;
};

const deleteUser = (userId) => {
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
