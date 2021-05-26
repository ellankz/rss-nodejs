import { TaskBody } from './task.types';
import tasksRepo from './task.memory.repository';
import Task from './task.model';

export const getAll = (boardId: string) => tasksRepo.getAll(boardId);

export const getOne = (boardId: string, taskId: string) => tasksRepo.getOne(boardId, taskId);

export const createOne = async (boardId: string, taskData: TaskBody) => {
  const res = await tasksRepo.createOne(
    boardId,
    new Task({ ...taskData, boardId }),
  );
  return res;
};

export const updateOne = async (boardId: string, taskId: string, taskData: TaskBody) => {
  const task = await getOne(boardId, taskId);

  if (task) {
    const newTask = new Task({ ...task, ...taskData, id: taskId });
    return tasksRepo.updateOne(boardId, newTask);
  }
  return null;
};

export const deleteOne = (boardId: string, taskId: string) => tasksRepo.deleteOne(boardId, taskId);

export const deleteAll = (boardId: string) => tasksRepo.deleteAll(boardId);

export const deleteUser = (userId: string) => tasksRepo.deleteUser(userId);
