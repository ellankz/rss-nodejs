import { getRepository } from "typeorm";
import { Task } from "../../entities/Task";

const getAll = async (boardId: string): Promise<Task[]> => {
  const repository = getRepository(Task);
  return repository.find({ where: { boardId }});
};

const getOne = async (boardId: string, taskId: string): Promise<Task | undefined> => {
  const repository = getRepository(Task);
  return repository.findOne(taskId, { where: { boardId }});
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

const deleteAll = async (boardId: string): Promise<true | undefined> => {
  const repository = getRepository(Task);
  const toDelete = await repository.find({where: {boardId}});
  try {
    const deleted = await Promise.all(toDelete.map(async (task) => {
      await repository.delete(task.id);
    }));
    if (deleted) {
      return true;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};

const deleteUser = async (userId: string): Promise<void> => {
  const repository = getRepository(Task);
  const tasks = await repository.find({where: {userId}});
  await Promise.all(tasks.map(async (task) => {
    await repository.update(task.id, {...task, userId: null});
  }));
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
