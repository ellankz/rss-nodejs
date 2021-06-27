import { getRepository } from "typeorm";
import { User } from "../../entities/User";


const getAll = async (): Promise<User[]> => {
  const repository = getRepository(User);
  return repository.find();
};

const getOne = async (id: string): Promise<User|undefined> => {
  const repository = getRepository(User);
  return repository.findOne(id);
}

const createOne = async (userData: Partial<User>): Promise<User> => {
  const repository = getRepository(User);
  const newUser = repository.create(userData);
  return repository.save(newUser);
};

const updateOne = async (userId: string, userData: Partial<User>): Promise<User|undefined> => {
  const repository = getRepository(User);
  const user = await repository.findOne(userId);
  if (user) {
    const updateRes = await repository.update(userId, userData)
    return updateRes.raw;
  }
  return undefined;
};

const deleteOne = async (id: string): Promise<true|undefined> => {
  const repository = getRepository(User);
  const deleteRes = await repository.delete(id);
  if (deleteRes.affected) {
    return true;
  }
  return undefined;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
