import { getRepository } from "typeorm";
import { Task } from "./task.entity";

const getAll = async (boardId: string): Promise<Task[]> => {
  const repository = getRepository(Task);
  return repository.find({ where: { boardId }, loadRelationIds: true });
};

const getOne = async (boardId: string, taskId: string): Promise<Task | undefined> => {
  const repository = getRepository(Task);
  return repository.findOne(taskId, { where: { boardId }, loadRelationIds: true });
};

const createOne = async (boardId: string, task: Partial<Task>): Promise<Task> => {
  const repository = getRepository(Task);
  const newTask = repository.create({...task, boardId});
  return repository.save(newTask);
};

const updateOne = async (boardId: string, taskId: string, task: Partial<Task>): Promise<Task | undefined> => {
  const repository = getRepository(Task);
  const oldBoard = await repository.findOne(taskId, { where: { boardId } });
  if (oldBoard) {
    const updateRes = await repository.update(taskId, task);
    return updateRes.raw;
  }
  return undefined;
};

const deleteOne = async (_boardId: string, taskId: string): Promise<true | undefined> => {
  const repository = getRepository(Task);
  const deleteRes = await repository.delete(taskId)
  if (deleteRes.affected) {
    return true;
  }
  return undefined;
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
