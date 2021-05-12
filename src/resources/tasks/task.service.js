import tasksRepo from './task.memory.repository.js';
import Task from './task.model.js';

export const getAll = (boardId) => tasksRepo.getAll(boardId);

export const getOne = (boardId, taskId) => tasksRepo.getOne(boardId, taskId);

export const createOne = async (boardId, taskData) => {
  const res = await tasksRepo.createOne(
    boardId,
    new Task({ ...taskData, boardId })
  );
  return res;
};

export const updateOne = async (boardId, taskId, taskData) => {
  const task = await getOne(boardId, taskId);
  const props = Object.getOwnPropertyNames(task);
  props.forEach((prop) => {
    if (prop !== 'id' && !!taskData[prop]) {
      task[prop] = taskData[prop];
    }
  });
  return tasksRepo.updateOne(boardId, task);
};

export const deleteOne = (boardId, taskId) =>
  tasksRepo.deleteOne(boardId, taskId);

export const deleteAll = (boardId) => tasksRepo.deleteAll(boardId);

export const deleteUser = (userId) => tasksRepo.deleteUser(userId);
