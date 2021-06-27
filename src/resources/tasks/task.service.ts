import { Task } from './task.entity';
import tasksRepo from './task.repository';

export const getAll = (boardId: string): Promise<Task[]> => tasksRepo.getAll(boardId);

export const getOne = (boardId: string, taskId: string): Promise<Task|undefined> => tasksRepo.getOne(boardId, taskId);

export const createOne = async (boardId: string, taskData: Partial<Task>): Promise<Task|null> => {
  const res = await tasksRepo.createOne(boardId, taskData);
  return res;
};

export const updateOne = async (boardId: string, taskId: string, taskData: Partial<Task>): Promise<Task|undefined> => tasksRepo.updateOne(boardId, taskId, taskData);

export const deleteOne = (boardId: string, taskId: string): Promise<true|undefined> => tasksRepo.deleteOne(boardId, taskId);


